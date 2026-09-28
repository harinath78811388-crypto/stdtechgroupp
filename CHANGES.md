# What was fixed

- Replaced in-memory authentication/certificate storage with MongoDB Atlas persistence.
- Added signed HMAC JWT sessions and `/api/auth/me`.
- Persisted user registration and seeded existing demo users.
- Persisted certificates and added atomic certificate numbering.
- Protected certificate creation and status changes with admin/staff authentication.
- Fixed public certificate verification URL mismatch.
- Removed the direct Firestore lookup from public certificate verification.
- Changed student certificate loading to a protected personal endpoint.
- Prevented the browser-only role switch from fabricating an admin session; it now uses the server demo-login endpoint.
- Fixed App.tsx so the login token is actually saved.
- Improved certificate printing so only the certificate is printed.
- Added MongoDB/production environment documentation.
