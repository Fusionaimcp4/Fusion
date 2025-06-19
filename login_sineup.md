## Detailed Prompt for Setting Up Multi-Provider OAuth and Email Login

### Step 1: Frontend UI Setup

* **Framework:** TypeScript with React
* **Styling:** Tailwind CSS
* **Login Component:**

  * Create a central login component.
  * Add buttons for OAuth providers:

    * Google
    * Microsoft
    * Apple
    * Amazon
    * LinkedIn
    * Facebook
  * Each OAuth provider icon triggers backend route (`/auth/<provider>`).
  * Include form inputs for "Login with Email."

### Step 2: Backend OAuth Integration

* **Framework:** Node.js with Express (TypeScript)
* **Libraries:** Passport.js, @types/passport, @types/express
* **Implementation:**

  * Configure OAuth credentials (client ID/secret).
  * Setup callback URLs (`/auth/google/callback`, etc.).
  * Manage OAuth flow (redirect, authentication, callback).

### Step 3: Email Authentication Setup

* **Framework:** Node.js with Express (TypeScript)
* **Process:**

  * Capture email/password input on frontend.
  * Backend securely hashes password using bcrypt.
  * Store and verify credentials against PostgreSQL database.

### Step 4: Database Setup

* **SQL Database:** PostgreSQL
* **Table Schema:**

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    oauth_provider VARCHAR(50),
    oauth_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 5: Backend Routes and API

* Routes:

  * `/auth/<provider>` – OAuth initiation
  * `/auth/<provider>/callback` – OAuth callback handling
  * `/auth/email/login` – email login
  * `/auth/email/register` – email registration

### Step 6: Secure Session Management

* Implement JWT tokens for session management.
* Secure JWT tokens and verify on protected routes.

### Step 7: Testing & Deployment

* Thoroughly test authentication flows.
* Deploy securely with HTTPS.
* Ensure proper error handling.

### Prompt for AI Agent to execute:

"Set up a secure login system with OAuth (Google, Microsoft, Apple, Amazon, LinkedIn, Facebook) and email/password authentication using TypeScript, React, Tailwind CSS, Node.js, and Express. Utilize PostgreSQL to store user data securely, including emails, hashed passwords, OAuth provider data, and timestamps. Manage sessions using JWT tokens, and include comprehensive setup and security best practices instructions."
