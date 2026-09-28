import 'dotenv/config';
import express from 'express';
import crypto from 'node:crypto';
import path from 'path';

import { createServer as createViteServer } from 'vite';
import { store } from './server/data';
import { connectMongo, getMongoDb } from './server/mongodb';


const PUBLIC_APP_URL = (process.env.APP_URL || 'https://stdtechgroup.com').replace(/\/$/, '');

function hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(password: string, stored: string) {
  if (!stored?.startsWith('scrypt$')) return false;
  const [, salt, expected] = stored.split('$');
  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value).toString('base64url');
}

function getJwtSecret() {
  return process.env.JWT_SECRET || 'dev-only-change-this-jwt-secret';
}

function getJwtExpiresInSeconds() {
  const raw = process.env.JWT_EXPIRES_IN || '7d';
  const match = raw.match(/^(\d+)\s*(s|m|h|d)$/i);
  if (!match) return 7 * 24 * 60 * 60;

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multipliers: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
  };

  return amount * multipliers[unit];
}

function signJwt(payload: Record<string, unknown>) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsigned = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createHmac('sha256', getJwtSecret())
    .update(unsigned)
    .digest('base64url');

  return `${unsigned}.${signature}`;
}

function verifyJwt(token: string): Record<string, any> | null {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    if (!encodedHeader || !encodedPayload || !signature) return null;

    const unsigned = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = crypto
      .createHmac('sha256', getJwtSecret())
      .update(unsigned)
      .digest('base64url');

    const a = Buffer.from(signature);
    const b = Buffer.from(expectedSignature);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    if (!payload.exp || Number(payload.exp) <= Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

function createAccessToken(user: { id: string; email: string; role: string }) {
  const now = Math.floor(Date.now() / 1000);
  return signJwt({
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + getJwtExpiresInSeconds(),
  });
}

function authenticate(req: any, res: any, next: any) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const payload = token ? verifyJwt(token) : null;

  if (!payload) {
    return res.status(401).json({ message: 'Authentication required. Please sign in again.' });
  }

  req.auth = payload;
  next();
}

function requireRoles(...roles: string[]) {
  return (req: any, res: any, next: any) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
    next();
  };
}

function safeUser(user: any) {
  if (!user) return null;
  const { passwordHash: _passwordHash, _id: _mongoId, ...publicUser } = user;
  return publicUser;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // MongoDB is the persistent source of truth for authentication and certificates.
  const mongo = await connectMongo();
  const usersCollection = mongo.collection('users');
  const certificatesCollection = mongo.collection('certificates');
  const auditLogsCollection = mongo.collection('audit_logs');
  const countersCollection = mongo.collection('counters');

  await usersCollection.createIndex({ email: 1 }, { unique: true });
  await certificatesCollection.createIndex({ certificateId: 1 }, { unique: true });
  await auditLogsCollection.createIndex({ timestamp: -1 });

  // Seed the existing demo accounts/certificates once, without overwriting later edits.
  for (const user of store.users) {
    await usersCollection.updateOne(
      { email: user.email.toLowerCase() },
      { $setOnInsert: { ...user, email: user.email.toLowerCase() } },
      { upsert: true }
    );
  }

  for (const certificate of store.certificates) {
    await certificatesCollection.updateOne(
      { certificateId: certificate.certificateId.toUpperCase() },
      { $setOnInsert: certificate },
      { upsert: true }
    );
  }

  const existingCertificateCount = await certificatesCollection.countDocuments();
  await countersCollection.updateOne(
    { _id: 'certificates' },
    { $setOnInsert: { seq: existingCertificateCount } },
    { upsert: true }
  );

  const writeAuditLog = async (entry: any) => {
    await auditLogsCollection.insertOne(entry);
  };

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Security headers & basic request logging
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  // ==========================================================
  // API ROUTES
  // ==========================================================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      company: 'STDTech Group Pvt Ltd',
      tagline: 'Technology | Innovation | Impact',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    });
  });

  // AUTHENTICATION ROUTES
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const normalizedEmail = String(email || '').trim().toLowerCase();

      const user = await usersCollection.findOne({ email: normalizedEmail });
      if (!user || !verifyPassword(password || '', user.passwordHash)) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      await writeAuditLog({
        id: `log-${Date.now()}`,
        userEmail: user.email,
        action: 'USER_LOGIN',
        entity: 'Auth',
        details: `User ${user.fullName} logged in successfully with role ${user.role}.`,
        timestamp: new Date().toISOString(),
      });

      const publicUser = safeUser(user);
      res.json({
        token: createAccessToken(publicUser),
        user: publicUser,
      });
    } catch (error) {
      console.error('[Auth] Login error:', error);
      res.status(500).json({ message: 'Unable to sign in right now.' });
    }
  });

  // Demo login is deliberately disabled by default in production.
  app.post('/api/auth/demo-login', async (req, res) => {
    try {
      if (process.env.NODE_ENV === 'production' && process.env.DEMO_LOGIN_ENABLED !== 'true') {
        return res.status(404).json({ message: 'Demo login is disabled in production.' });
      }

      const { role } = req.body;
      const targetUser = await usersCollection.findOne({ role }) || await usersCollection.findOne({ role: 'admin' });

      if (!targetUser) {
        return res.status(404).json({ message: 'Demo account not available.' });
      }

      await writeAuditLog({
        id: `log-${Date.now()}`,
        userEmail: targetUser.email,
        action: 'DEMO_LOGIN_SWITCH',
        entity: 'Auth',
        details: `Role switched to ${targetUser.role} (${targetUser.fullName}).`,
        timestamp: new Date().toISOString(),
      });

      const publicUser = safeUser(targetUser);
      res.json({
        token: createAccessToken(publicUser),
        user: publicUser,
      });
    } catch (error) {
      console.error('[Auth] Demo login error:', error);
      res.status(500).json({ message: 'Demo login failed.' });
    }
  });

  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, fullName, role, phone } = req.body;
      const normalizedEmail = String(email || '').trim().toLowerCase();

      if (!normalizedEmail || !password || !fullName) {
        return res.status(400).json({ message: 'Email, password, and full name are required.' });
      }

      if (String(password).length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
      }

      const existing = await usersCollection.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
      }

      // Public registration may create customer/student accounts only.
      const assignedRole = role === 'student' ? 'student' : 'customer';
      const newUser = {
        id: `usr-${crypto.randomUUID()}`,
        email: normalizedEmail,
        fullName: String(fullName).trim(),
        role: assignedRole as any,
        phone: phone || '',
        createdAt: new Date().toISOString(),
        passwordHash: hashPassword(password),
      };

      await usersCollection.insertOne(newUser);

      await writeAuditLog({
        id: `log-${Date.now()}`,
        userEmail: newUser.email,
        action: 'USER_REGISTRATION',
        entity: 'Auth',
        details: `New account created for ${newUser.fullName} with role ${newUser.role}.`,
        timestamp: new Date().toISOString(),
      });

      const publicUser = safeUser(newUser);
      res.status(201).json({
        token: createAccessToken(publicUser),
        user: publicUser,
      });
    } catch (error: any) {
      if (error?.code === 11000) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
      }
      console.error('[Auth] Registration error:', error);
      res.status(500).json({ message: 'Unable to create the account right now.' });
    }
  });

  app.get('/api/auth/me', authenticate, async (req: any, res) => {
    try {
      const user = await usersCollection.findOne({ id: req.auth.sub });
      if (!user) return res.status(401).json({ message: 'Account no longer exists.' });
      res.json({ user: safeUser(user) });
    } catch (error) {
      console.error('[Auth] Session lookup error:', error);
      res.status(500).json({ message: 'Unable to validate your session.' });
    }
  });

  // SERVICES
  app.get('/api/services', (req, res) => {
    res.json(store.services);
  });

  app.get('/api/services/:slug', (req, res) => {
    const service = store.services.find((s) => s.slug === req.params.slug);
    if (!service) return res.status(404).json({ message: 'Service not found.' });
    res.json(service);
  });

  app.post('/api/services', (req, res) => {
    const newService = { ...req.body, id: `srv-${Date.now()}` };
    store.services.push(newService);
    res.status(201).json(newService);
  });

  app.put('/api/services/:id', (req, res) => {
    const index = store.services.findIndex((s) => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Service not found.' });
    store.services[index] = { ...store.services[index], ...req.body };
    res.json(store.services[index]);
  });

  // PRODUCTS
  app.get('/api/products', (req, res) => {
    res.json(store.products);
  });

  app.get('/api/products/:slug', (req, res) => {
    const product = store.products.find((p) => p.slug === req.params.slug);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  });

  app.post('/api/products', (req, res) => {
    const newProduct = { ...req.body, id: `prod-${Date.now()}` };
    store.products.push(newProduct);
    res.status(201).json(newProduct);
  });

  app.put('/api/products/:id', (req, res) => {
    const index = store.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Product not found.' });
    store.products[index] = { ...store.products[index], ...req.body };
    res.json(store.products[index]);
  });

  // PORTFOLIO / PROJECTS
  app.get('/api/projects', (req, res) => {
    res.json(store.portfolio);
  });

  app.get('/api/projects/:slug', (req, res) => {
    const project = store.portfolio.find((p) => p.slug === req.params.slug);
    if (!project) return res.status(404).json({ message: 'Project not found.' });
    res.json(project);
  });

  app.post('/api/projects', (req, res) => {
    const newProj = { ...req.body, id: `proj-${Date.now()}` };
    store.portfolio.push(newProj);
    res.status(201).json(newProj);
  });

  app.put('/api/projects/:id', (req, res) => {
    const index = store.portfolio.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Project not found.' });
    store.portfolio[index] = { ...store.portfolio[index], ...req.body };
    res.json(store.portfolio[index]);
  });

  // COURSES / STDTECH ACADEMY
  app.get('/api/courses', (req, res) => {
    res.json(store.courses);
  });

  app.get('/api/courses/:slug', (req, res) => {
    const course = store.courses.find((c) => c.slug === req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    res.json(course);
  });

  app.post('/api/courses', (req, res) => {
    const newCourse = { ...req.body, id: `crs-${Date.now()}` };
    store.courses.push(newCourse);
    res.status(201).json(newCourse);
  });

  app.put('/api/courses/:id', (req, res) => {
    const index = store.courses.findIndex((c) => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Course not found.' });
    store.courses[index] = { ...store.courses[index], ...req.body };
    res.json(store.courses[index]);
  });

  // CERTIFICATES & VERIFICATION
  app.get('/api/certificates', authenticate, requireRoles('admin', 'staff'), async (_req, res) => {
    try {
      const certificates = await certificatesCollection.find({}).sort({ createdAt: -1 }).toArray();
      res.json(certificates.map(({ _id, ...certificate }) => certificate));
    } catch (error) {
      console.error('[Certificates] List error:', error);
      res.status(500).json({ message: 'Unable to load certificates.' });
    }
  });

  // A signed-in student can see only certificates issued to their own account.
  app.get('/api/my-certificates', authenticate, async (req: any, res) => {
    try {
      const user = await usersCollection.findOne({ id: req.auth.sub });
      if (!user) return res.status(401).json({ message: 'Account no longer exists.' });

      const query =
        user.role === 'student'
          ? { $or: [{ studentEmail: user.email }, { studentName: user.fullName }] }
          : { studentEmail: user.email };

      const certificates = await certificatesCollection.find(query).sort({ createdAt: -1 }).toArray();
      res.json(certificates.map(({ _id, ...certificate }) => certificate));
    } catch (error) {
      console.error('[Certificates] Personal list error:', error);
      res.status(500).json({ message: 'Unable to load your certificates.' });
    }
  });

  // Public Certificate Verification Endpoint
  app.get('/api/certificates/verify/:certId', async (req, res) => {
    try {
      const certId = req.params.certId.trim().toUpperCase();
      const cert = await certificatesCollection.findOne({ certificateId: certId });

      if (!cert) {
        return res.status(404).json({
          found: false,
          message: 'No certificate found with this Certificate ID in the STDTech official verification registry.',
        });
      }

      const { _id, ...certificate } = cert;
      res.json({
        found: true,
        certificate,
        verifiedAt: new Date().toISOString(),
        isAuthentic: certificate.status === 'valid',
      });
    } catch (error) {
      console.error('[Certificates] Verification error:', error);
      res.status(500).json({ found: false, message: 'Certificate verification is temporarily unavailable.' });
    }
  });

  // Generate / Issue new certificate — admin/staff only.
  app.post('/api/certificates', authenticate, requireRoles('admin', 'staff'), async (req: any, res) => {
    try {
      const { studentName, studentEmail, courseTitle, courseDuration, completionDate } = req.body;

      if (!studentName || !courseTitle) {
        return res.status(400).json({ message: 'Student name and course title are required.' });
      }

      const counter = await countersCollection.findOneAndUpdate(
        { _id: 'certificates' },
        { $inc: { seq: 1 } },
        { returnDocument: 'after' }
      );

      const nextIndex = Number(counter?.seq || 1);
      const certId = `STDT-${new Date().getFullYear()}-${String(nextIndex).padStart(5, '0')}`;
      const finalCompletionDate = completionDate || new Date().toISOString().split('T')[0];

      const newCert: any = {
        id: `cert-${crypto.randomUUID()}`,
        certificateId: certId,
        studentName: String(studentName).trim(),
        ...(studentEmail ? { studentEmail: String(studentEmail).trim().toLowerCase() } : {}),
        courseTitle: String(courseTitle).trim(),
        courseDuration: courseDuration || '3 Months (120 Hours)',
        completionDate: finalCompletionDate,
        issuingOrganization: 'STDTech Group Pvt Ltd',
        status: 'valid',
        qrCodePayload: `${(process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '')}/verify/${certId}`,
        verificationHash: `sha256:${crypto.createHash('sha256').update(
          `${certId}|${studentName}|${courseTitle}|${finalCompletionDate}|${process.env.CERTIFICATE_SIGNING_SECRET || 'development-only-secret'}`
        ).digest('hex')}`,
        createdAt: new Date().toISOString(),
      };

      await certificatesCollection.insertOne(newCert);

      await writeAuditLog({
        id: `log-${Date.now()}`,
        userEmail: req.auth.email,
        action: 'CERTIFICATE_GENERATED',
        entity: 'Certificates',
        details: `Generated Certificate ${certId} for student ${newCert.studentName}.`,
        timestamp: new Date().toISOString(),
      });

      res.status(201).json(newCert);
    } catch (error: any) {
      if (error?.code === 11000) {
        return res.status(409).json({ message: 'Certificate ID collision. Please try again.' });
      }
      console.error('[Certificates] Generate error:', error);
      res.status(500).json({ message: 'Unable to generate certificate.' });
    }
  });

  // Revoke / Reinstate certificate status — admin/staff only.
  app.put('/api/certificates/:id/status', authenticate, requireRoles('admin', 'staff'), async (req: any, res) => {
    try {
      const { status } = req.body;
      const nextStatus = status === 'revoked' ? 'revoked' : 'valid';

      const result = await certificatesCollection.findOneAndUpdate(
        {
          $or: [
            { id: req.params.id },
            { certificateId: req.params.id.toUpperCase() },
          ],
        },
        { $set: { status: nextStatus, updatedAt: new Date().toISOString() } },
        { returnDocument: 'after' }
      );

      if (!result) return res.status(404).json({ message: 'Certificate not found.' });

      const { _id, ...certificate } = result;

      await writeAuditLog({
        id: `log-${Date.now()}`,
        userEmail: req.auth.email,
        action: 'CERTIFICATE_STATUS_UPDATED',
        entity: 'Certificates',
        details: `Certificate ${certificate.certificateId} status changed to ${certificate.status}.`,
        timestamp: new Date().toISOString(),
      });

      res.json(certificate);
    } catch (error) {
      console.error('[Certificates] Status update error:', error);
      res.status(500).json({ message: 'Unable to update certificate status.' });
    }
  });

  // CAREERS & JOBS
  app.get('/api/jobs', (req, res) => {
    res.json(store.jobs);
  });

  app.get('/api/jobs/:id', (req, res) => {
    const job = store.jobs.find((j) => j.id === req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json(job);
  });

  app.post('/api/jobs', (req, res) => {
    const newJob = { ...req.body, id: `job-${Date.now()}`, createdAt: new Date().toISOString() };
    store.jobs.push(newJob);
    res.status(201).json(newJob);
  });

  app.put('/api/jobs/:id', (req, res) => {
    const index = store.jobs.findIndex((j) => j.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Job not found.' });
    store.jobs[index] = { ...store.jobs[index], ...req.body };
    res.json(store.jobs[index]);
  });

  app.delete('/api/jobs/:id', (req, res) => {
    store.jobs = store.jobs.filter((j) => j.id !== req.params.id);
    res.json({ success: true });
  });

  // JOB APPLICATIONS
  app.get('/api/applications', (req, res) => {
    res.json(store.applications);
  });

  app.post('/api/applications', (req, res) => {
    const { jobId, jobTitle, name, email, phone, position, experienceYears, education, resumeFileName, portfolioUrl, coverMessage } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required.' });
    }

    const newApp: any = {
      id: `app-${Date.now()}`,
      jobId: jobId || 'general',
      jobTitle: jobTitle || position || 'General Tech Application',
      name,
      email,
      phone,
      position: position || jobTitle || 'Developer',
      experienceYears: experienceYears || 'Fresher',
      education: education || 'Diploma / B.Tech / Degree',
      resumeFileName: resumeFileName || 'Uploaded_Resume.pdf',
      portfolioUrl: portfolioUrl || '',
      coverMessage: coverMessage || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    store.applications.push(newApp);

    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      userEmail: email,
      action: 'CAREER_APPLICATION_SUBMITTED',
      entity: 'Careers',
      details: `New job application received from ${name} for ${newApp.jobTitle}.`,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully to STDTech Group HR.',
      application: newApp,
    });
  });

  app.put('/api/applications/:id/status', (req, res) => {
    const { status } = req.body;
    const appItem = store.applications.find((a) => a.id === req.params.id);
    if (!appItem) return res.status(404).json({ message: 'Application not found.' });
    appItem.status = status;
    res.json(appItem);
  });

  // BLOG POSTS
  app.get('/api/blog', (req, res) => {
    res.json(store.blogPosts);
  });

  app.get('/api/blog/:slug', (req, res) => {
    const post = store.blogPosts.find((b) => b.slug === req.params.slug);
    if (!post) return res.status(404).json({ message: 'Blog post not found.' });
    res.json(post);
  });

  app.post('/api/blog', (req, res) => {
    const newPost = {
      ...req.body,
      id: `blog-${Date.now()}`,
      publishedAt: new Date().toISOString(),
    };
    store.blogPosts.push(newPost);
    res.status(201).json(newPost);
  });

  // CONTACT FORM
  app.get('/api/contact', (req, res) => {
    res.json(store.contactMessages);
  });

  app.post('/api/contact', (req, res) => {
    const { name, email, phone, subject, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const newInquiry: any = {
      id: `msg-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      subject: subject || 'General IT Inquiry',
      service: service || 'General Consulting',
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    store.contactMessages.unshift(newInquiry);

    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      userEmail: email,
      action: 'CONTACT_INQUIRY_RECEIVED',
      entity: 'Inquiries',
      details: `Contact form inquiry submitted by ${name} (${email}).`,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received by the STDTech Group executive team.',
      inquiry: newInquiry,
    });
  });

  app.put('/api/contact/:id/status', (req, res) => {
    const { status } = req.body;
    const msg = store.contactMessages.find((m) => m.id === req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found.' });
    msg.status = status;
    res.json(msg);
  });

  // SUPPORT TICKETS (For Customers & Staff)
  app.get('/api/support', (req, res) => {
    res.json(store.supportTickets);
  });

  app.post('/api/support', (req, res) => {
    const { userId, userName, userEmail, subject, message, priority } = req.body;
    const ticket: any = {
      id: `tkt-${Date.now()}`,
      userId: userId || 'anonymous',
      userName: userName || 'Customer',
      userEmail: userEmail || 'client@stdtechgroup.com',
      subject: subject || 'Support Request',
      message,
      priority: priority || 'Normal',
      status: 'Open',
      createdAt: new Date().toISOString(),
    };
    store.supportTickets.unshift(ticket);
    res.status(201).json(ticket);
  });

  app.put('/api/support/:id/reply', (req, res) => {
    const { reply, status } = req.body;
    const ticket = store.supportTickets.find((t) => t.id === req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found.' });
    ticket.adminReply = reply;
    if (status) ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    res.json(ticket);
  });

  // AUDIT LOGS
  app.get('/api/audit-logs', async (_req, res) => {
    try {
      const logs = await auditLogsCollection.find({}).sort({ timestamp: -1 }).limit(200).toArray();
      res.json(logs.map(({ _id, ...log }) => log));
    } catch (error) {
      console.error('[Audit] Load error:', error);
      res.status(500).json({ message: 'Unable to load audit logs.' });
    }
  });

  // SYSTEM STATS (Admin Dashboard)
  app.get('/api/admin/stats', async (_req, res) => {
    try {
      const [totalUsers, totalCertificates, validCertificates] = await Promise.all([
        usersCollection.countDocuments(),
        certificatesCollection.countDocuments(),
        certificatesCollection.countDocuments({ status: 'valid' }),
      ]);

      res.json({
        totalUsers,
        totalServices: store.services.length,
        totalProducts: store.products.length,
        totalProjects: store.portfolio.length,
        totalCourses: store.courses.length,
        totalCertificates,
        totalJobs: store.jobs.length,
        totalApplications: store.applications.length,
        totalInquiries: store.contactMessages.length,
        pendingInquiries: store.contactMessages.filter((m) => m.status === 'new').length,
        validCertificates,
      });
    } catch (error) {
      console.error('[Admin] Stats error:', error);
      res.status(500).json({ message: 'Unable to load admin statistics.' });
    }
  });

  // STUDENT DASHBOARD DATA
  app.get('/api/student/data', (req, res) => {
    res.json({
      student: store.users.find((u) => u.role === 'student'),
      enrollments: store.studentEnrollments,
      availableCourses: store.courses,
      certificates: await certificatesCollection
        .find({ studentName: /Aditya/i })
        .sort({ createdAt: -1 })
        .toArray(),
    });
  });

  // Vite middleware for development vs Static file serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[STDTech Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[STDTech Server] Error starting server:', err);
});
