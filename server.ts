import express from 'express';
import crypto from 'node:crypto';
import path from 'path';

import { createServer as createViteServer } from 'vite';
import { store } from './server/data';


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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

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
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = store.users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    if (!verifyPassword(password || '', user.passwordHash)) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Log login action
    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      userEmail: user.email,
      action: 'USER_LOGIN',
      entity: 'Auth',
      details: `User ${user.fullName} logged in successfully with role ${user.role}.`,
      timestamp: new Date().toISOString(),
    });

    const { passwordHash: _, ...safeUser } = user;
    res.json({
      token: `stdt_jwt_${safeUser.id}_${Date.now()}`,
      user: safeUser,
    });
  });

  // Demo Login (Instant Role-Switch for previewing Admin, Staff, Student, Customer)
  app.post('/api/auth/demo-login', (req, res) => {
    if (process.env.NODE_ENV === 'production' && process.env.DEMO_LOGIN_ENABLED !== 'true') {
      return res.status(404).json({ message: 'Demo login is disabled in production.' });
    }
    const { role } = req.body;
    const targetUser = store.users.find((u) => u.role === role) || store.users[0];

    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      userEmail: targetUser.email,
      action: 'DEMO_LOGIN_SWITCH',
      entity: 'Auth',
      details: `Role switched to ${targetUser.role} (${targetUser.fullName}).`,
      timestamp: new Date().toISOString(),
    });

    const { passwordHash: _, ...safeUser } = targetUser;
    res.json({
      token: `stdt_jwt_${safeUser.id}_${Date.now()}`,
      user: safeUser,
    });
  });

  app.post('/api/auth/register', (req, res) => {
    const { email, password, fullName, role, phone } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'Email, password, and full name are required.' });
    }

    const existing = store.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const assignedRole = role === 'staff' || role === 'admin' ? 'customer' : (role || 'customer');
    const newUser = {
      id: `usr-${Date.now()}`,
      email,
      fullName,
      role: assignedRole as any,
      phone: phone || '',
      createdAt: new Date().toISOString(),
      passwordHash: hashPassword(password),
    };

    store.users.push(newUser);

    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      userEmail: newUser.email,
      action: 'USER_REGISTRATION',
      entity: 'Auth',
      details: `New account created for ${newUser.fullName} with role ${newUser.role}.`,
      timestamp: new Date().toISOString(),
    });

    const { passwordHash: _, ...safeUser } = newUser;
    res.status(201).json({
      token: `stdt_jwt_${safeUser.id}_${Date.now()}`,
      user: safeUser,
    });
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
  app.get('/api/certificates', (req, res) => {
    res.json(store.certificates);
  });

  // Public Certificate Verification Endpoint
  app.get('/api/certificates/verify/:certId', (req, res) => {
    const certId = req.params.certId.trim().toUpperCase();
    const cert = store.certificates.find((c) => c.certificateId.toUpperCase() === certId);

    if (!cert) {
      return res.status(404).json({
        found: false,
        message: 'No certificate found with this Certificate ID in the STDTech official verification registry.',
      });
    }

    res.json({
      found: true,
      certificate: cert,
      verifiedAt: new Date().toISOString(),
      isAuthentic: cert.status === 'valid',
    });
  });

  // Generate / Issue new certificate
  app.post('/api/certificates', (req, res) => {
    const { studentName, courseTitle, courseDuration, completionDate } = req.body;

    if (!studentName || !courseTitle) {
      return res.status(400).json({ message: 'Student name and course title are required.' });
    }

    const nextIndex = store.certificates.length + 1;
    const certId = `STDT-2026-${String(nextIndex).padStart(5, '0')}`;

    const newCert: any = {
      id: `cert-${Date.now()}`,
      certificateId: certId,
      studentName,
      courseTitle,
      courseDuration: courseDuration || '3 Months (120 Hours)',
      completionDate: completionDate || new Date().toISOString().split('T')[0],
      issuingOrganization: 'STDTech Group Pvt Ltd',
      status: 'valid',
      qrCodePayload: `${PUBLIC_APP_URL}/verify/${certId}`,
      verificationHash: `sha256:${crypto.createHash('sha256').update(
        `${certId}|${studentName}|${courseTitle}|${completionDate || ''}|${process.env.CERTIFICATE_SIGNING_SECRET || 'development-only-secret'}`
      ).digest('hex')}`,
      createdAt: new Date().toISOString(),
    };

    store.certificates.push(newCert);

    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      userEmail: 'admin@stdtechgroup.com',
      action: 'CERTIFICATE_GENERATED',
      entity: 'Certificates',
      details: `Generated Certificate ${certId} for student ${studentName}.`,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json(newCert);
  });

  // Revoke / Reinstate certificate status
  app.put('/api/certificates/:id/status', (req, res) => {
    const { status } = req.body;
    const cert = store.certificates.find((c) => c.id === req.params.id || c.certificateId === req.params.id);

    if (!cert) return res.status(404).json({ message: 'Certificate not found.' });

    cert.status = status === 'revoked' ? 'revoked' : 'valid';

    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      userEmail: 'admin@stdtechgroup.com',
      action: 'CERTIFICATE_STATUS_UPDATED',
      entity: 'Certificates',
      details: `Certificate ${cert.certificateId} status changed to ${cert.status}.`,
      timestamp: new Date().toISOString(),
    });

    res.json(cert);
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
  app.get('/api/audit-logs', (req, res) => {
    res.json(store.auditLogs);
  });

  // SYSTEM STATS (Admin Dashboard)
  app.get('/api/admin/stats', (req, res) => {
    res.json({
      totalUsers: store.users.length,
      totalServices: store.services.length,
      totalProducts: store.products.length,
      totalProjects: store.portfolio.length,
      totalCourses: store.courses.length,
      totalCertificates: store.certificates.length,
      totalJobs: store.jobs.length,
      totalApplications: store.applications.length,
      totalInquiries: store.contactMessages.length,
      pendingInquiries: store.contactMessages.filter((m) => m.status === 'new').length,
      validCertificates: store.certificates.filter((c) => c.status === 'valid').length,
    });
  });

  // STUDENT DASHBOARD DATA
  app.get('/api/student/data', (req, res) => {
    res.json({
      student: store.users.find((u) => u.role === 'student'),
      enrollments: store.studentEnrollments,
      availableCourses: store.courses,
      certificates: store.certificates.filter((c) => c.studentName.includes('Aditya') || c.id === 'cert-01'),
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
