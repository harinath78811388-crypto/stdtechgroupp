# MongoDB Atlas setup for STDTech Group

The application now uses MongoDB Atlas for persistent login accounts and certificates.

## Environment variables

Set these in your local `.env` or deployment environment. Do not commit the real values to GitHub.

```env
MONGODB_URI="your Atlas connection string"
MONGODB_DB_NAME="stdtech_group"
JWT_SECRET="use-a-long-random-secret"
JWT_EXPIRES_IN="7d"
CERTIFICATE_SIGNING_SECRET="use-another-long-random-secret"
APP_URL="https://your-real-deployed-domain.example"
NODE_ENV="production"
DEMO_LOGIN_ENABLED="false"
PORT="3000"
```

## First startup

The server creates the required MongoDB indexes and seeds the existing demo accounts/certificates only when their records are missing. Existing MongoDB records are not overwritten.

## Important

- Never put the real `MONGODB_URI` in GitHub.
- Keep your Atlas IP/network rules configured for the machine or hosting provider that runs the backend.
- Set `APP_URL` to the exact public URL users will open. New certificate QR codes use this value.
- The public verification endpoint is `/api/certificates/verify/:certificateId`.
- Certificate creation and revoke/reinstate operations require an authenticated admin or staff session.
- Students use `/api/my-certificates`, so the public certificate list is not exposed to them.
