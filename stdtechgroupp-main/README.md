# STDTech Group Pvt Ltd

> **Technology | Innovation | Impact**

STDTech Group Pvt Ltd is a technology company focused on building software products, delivering digital solutions, developing AI-powered technologies, and providing practical technology education.

## 🌐 About STDTech Group

STDTech Group aims to use technology to create practical solutions for businesses, students, developers, and communities.

Our work focuses on:

- 💻 Software & Web Development
- 🤖 Artificial Intelligence & Machine Learning
- ☁️ Cloud & Digital Solutions
- 🛡️ Cybersecurity & Secure Systems
- 🎓 Technology Education & Skill Development
- 🚀 Innovative Technology Products

## 🎯 Mission

> To empower people, businesses, and communities through innovative technology.

## 🔭 Vision

To become a technology company that creates new opportunities for businesses, students, and communities through innovation, AI, and digital solutions while making technology more accessible and impactful.

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- MongoDB Atlas

### Security
- Secure authentication
- Password hashing
- JWT-based authentication
- Role-based access control
- QR-based verification
- Security-focused API design

## 🚀 Platform Features

The STDTech platform is designed to support:

- 👤 User authentication
- 🔐 Secure login system
- 🎓 Student & staff portals
- 🏢 Admin dashboard
- 📜 Certificate generation
- 🔎 Certificate verification
- 📱 QR-based certificate verification
- 📊 Management dashboards
- 🤖 AI-powered technology solutions
- 🌐 Digital services

## 📜 Certificate Verification

STDTech Group can provide digitally verifiable certificates.

Example certificate ID:

```text
STDT-2026-00001


## Persistent Authentication & Certificates

The production authentication and certificate registry use MongoDB Atlas.

Required environment variables:

- `MONGODB_URI` — MongoDB Atlas connection string
- `MONGODB_DB_NAME` — database name (default: `stdtech_group`)
- `JWT_SECRET` — long random secret for signed login sessions
- `JWT_EXPIRES_IN` — session lifetime, e.g. `7d`
- `CERTIFICATE_SIGNING_SECRET` — secret used when generating certificate verification hashes
- `APP_URL` — public deployed URL used in certificate QR codes

The repository does **not** contain the real MongoDB connection string or any database password. Configure those only in the deployment environment or local `.env`.

The first server startup seeds the existing demo users and the two initial demonstration certificates into MongoDB if they do not already exist.
