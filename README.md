# Multi-Provider Authentication System

This project implements a secure login and authentication system with multiple OAuth providers and email/password authentication.

## Features

- OAuth authentication with:
  - Google
  - Microsoft
  - Apple
  - Amazon
  - LinkedIn
  - Facebook
- Secure email/password authentication
- JWT token-based session management
- Protected routes
- PostgreSQL database storage

## Setup

### Prerequisites

- Node.js (v14+)
- PostgreSQL database
- OAuth provider credentials (for each provider you want to enable)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   # Server settings
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   JWT_SECRET=your-jwt-secret-key-change-in-production
   SESSION_SECRET=your-session-secret-key-change-in-production

   # Database settings
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/auth_db

   # OAuth providers - add your own credentials here
   # Google
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Add credentials for other providers as needed
   ```

4. Run the PostgreSQL setup script to create the database and tables:
   ```
   psql -U postgres -f schema.sql
   ```

5. Build and start the backend server:
   ```
   npm run build
   npm start
   ```

   For development with auto-reload:
   ```
   npm run dev
   ```

### Frontend Setup

1. From the project root, create a `.env.local` file with the following:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Usage

- Navigate to `http://localhost:3000/login` for the login page
- Navigate to `http://localhost:3000/signup` for the signup page

## Protecting Routes

To protect a route that requires authentication, wrap the component with the `ProtectedRoute` component:

```jsx
import ProtectedRoute from '../components/ProtectedRoute'

export default function SecurePage() {
  return (
    <ProtectedRoute>
      <div>This is a protected page</div>
    </ProtectedRoute>
  )
}
```

## Security Notes

- In production, ensure all sensitive environment variables are properly secured
- Use HTTPS for all communications
- Rotate JWT secrets periodically
- Set secure and httpOnly flags on cookies in production
- Implement rate limiting to prevent brute force attacks 