# Complete MERN Authentication 🔐

A complete user authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js), featuring user registration, login, email verification, password reset, and JWT-based authentication.

## 🌟 Features

- ✅ User Sign Up with hashed passwords
- ✅ Email Verification with a 6-digit code
- ✅ Login with JWT token authentication
- ✅ Forgot Password flow – reset via email OTP
- ✅ Secure cookie-based sessions
- ✅ Middleware for protected routes
- ✅ Modular, scalable backend structure

## 🛠 Tech Stack

**Frontend**
- React.js
- Tailwind CSS *(if used)*

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- dotenv

**Email Services**
- Nodemailer for sending verification and reset emails

## 🔐 Authentication Flow

1. **Signup**
   - User registers with name, email, and password
   - A 6-digit verification code is sent to their email
   - User verifies email using the code

2. **Login**
   - Email & password are validated
   - On success, a JWT token is generated and stored in HTTP-only cookies

3. **Forgot Password**
   - User enters registered email
   - A new 6-digit verification code is emailed
   - User enters the code and sets a new password

