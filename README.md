# JanMitram (Production-Ready Version)

JanMitram is a campus placement platform with a real full-stack architecture:
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + MongoDB
- Auth: JWT with role-based access (student, recruiter, admin)

## What Was Fixed

1. Real authentication (signup/login/logout) with JWT
2. Protected routes and role-based access control
3. Real backend APIs for jobs, applications, and analytics
4. Mock data replaced with backend-driven UI flows
5. Lint errors fixed and code quality improved
6. Route-level lazy loading for better bundle performance
7. Real error and success messages from API responses
8. Basic tests and CI workflow added
9. Hardcoded user profile replaced with authenticated user context
10. Accessibility improvements for navigation controls and links

## Project Structure

```text
janmitram/
  backend/
    src/
      app.js
      server.js
      config/
        db.js
        env.js
      middleware/
        auth.js
        error.js
      models/
        User.js
        Job.js
        Application.js
      routes/
        auth.routes.js
        jobs.routes.js
        applications.routes.js
        analytics.routes.js
      seed/
        seedData.js
    .env.example
    package.json

  src/
    components/
      ProtectedRoute.tsx
      Navbar.tsx
      JobCard.tsx
      ...
    context/
      AuthContext.tsx
      AuthContextBase.ts
      useAuth.ts
    lib/
      api.ts
    pages/
      Login.tsx
      StudentDashboard.tsx
      RecruiterDashboard.tsx
      AdminDashboard.tsx
      Analytics.tsx
      ...
    types/
      auth.ts
      api.ts
    test/
      auth-context.test.tsx
      setup.ts

  .github/workflows/ci.yml
  .env.example
  vite.config.ts
  vitest.config.ts
```

## How Frontend, Backend, and Database Connect

1. User logs in from frontend (`src/pages/Login.tsx`).
2. Frontend calls backend `/api/auth/login` (`src/lib/api.ts`).
3. Backend verifies credentials from MongoDB (`backend/src/models/User.js`).
4. Backend returns JWT token.
5. Frontend stores token in `localStorage` and sends it in `Authorization: Bearer <token>` header for protected APIs.
6. Backend middleware (`backend/src/middleware/auth.js`) validates token and role.
7. Protected data (jobs, applications, analytics) is returned to the frontend dashboard pages.

## API Overview

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/jobs` (auth required)
- `POST /api/jobs` (recruiter/admin)
- `POST /api/applications` (student)
- `GET /api/applications/mine` (student)
- `GET /api/applications/recruiter` (recruiter/admin)
- `GET /api/analytics/summary` (admin)

## Local Setup

### 1. Frontend

```bash
npm install
copy .env.example .env
npm run dev
```

Frontend runs on `http://localhost:8080`.

### 2. Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`.

## Demo Users (Seeded Automatically)

- Student: `student@janmitram.dev`
- Recruiter: `recruiter@janmitram.dev`
- Admin: `admin@janmitram.dev`
- Password for all: `Password@123`

## Quality Gates

```bash
npm run lint
npm run test:run
npm run build
```

## CI/CD

GitHub Actions workflow is added at `.github/workflows/ci.yml`:
- Lint
- Test
- Build
- Backend syntax smoke check

## Deployment Notes

- Frontend can be deployed on Vercel/Netlify.
- Backend can be deployed on Render/Railway/Azure App Service.
- MongoDB Atlas is recommended for production DB.
- Set production env vars:
  - Frontend: `VITE_API_BASE_URL`
  - Backend: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`
