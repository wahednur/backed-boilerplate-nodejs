# 🚀 Backend Boilerplate — Express, TypeScript, Prisma 7+, PostgreSQL, Zod

A production-ready backend boilerplate built with Express, TypeScript, Prisma (Latest), Zod, PostgreSQL, JWT, and modern best practices.
Perfect for starting new backend applications instantly without rewriting setup code.

---

### Tech Stack

- Runtime: Bun / Node.js

- Backend Framework: Express

- Language: TypeScript

- Database ORM: Prisma (Latest v7+)

- Database: PostgreSQL

- Validation: Zod

- Authentication: JWT + Cookies

- Error Handling: Centralized Error Handler

- Utilities: Http-status-codes, cookie-parser, dotenv

- Code Quality: ESLint + TypeScript strict mode

- Security: CORS, Helmet

- Send email, OTP: Nodemailer + Redis

## ✨ Features

- ⚡ Express + TypeScript

- 🗄️ Prisma 7+ ORM (Latest)

- 🐘 PostgreSQL support

- 🔐 JWT Auth (Access + Refresh Token)

- 🍪 HttpOnly Secure Cookies

- 🧩 Zod Request Validation

- ⣿ OTP verification

- 🚨 Centralized Error Handling

- 📦 Modular folder structure

- 🧪 Middleware: Auth, Validation, Async Wrapper

- 🧹 ESLint + Strict TypeScript + Clean Code

- ⚙️ Environment-based configuration

- 🏗️ Scalable for large projects

**_ 📁 Perfect for: _**

- REST APIs

- SaaS Backends

- E-commerce Backends

- Authentication Services

- Microservices

- Any new Node.js backend project

🤝 Contributions

PRs are welcome!
Follow the folder structure and code conventions.

### 🏗️ Project Structure

```
server
├── prisma
│   └── schema
│       ├── enum.prisma
│       ├── schema.prisma
│       └── user.prisma
├── src
│   ├── app
│   │   ├── config
│   │   │   ├── env.ts
│   │   │   ├── passport.ts
│   │   │   └── redies.config.ts
│   │   ├── errors
│   │   │   ├── ApiError.ts
│   │   │   ├── error.interface.ts
│   │   │   ├── globalErrorHandler.ts
│   │   │   ├── handlePrismaErrors.ts
│   │   │   ├── handleZodError.ts
│   │   │   └── notFoundError.ts
│   │   ├── lib
│   │   │   └── prisma.ts
│   │   ├── middlewares
│   │   │   ├── checkAuth.ts
│   │   │   └── validationRequest.ts
│   │   ├── modules
│   │   │   ├── auth
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.route.ts
│   │   │   │   └── auth.service.ts
│   │   │   ├── otp
│   │   │   │   ├── otp.controller.ts
│   │   │   │   ├── otp.routes.ts
│   │   │   │   └── otp.service.ts
│   │   │   └── user
│   │   │       ├── user.controller.ts
│   │   │       ├── user.interface.ts
│   │   │       ├── user.route.ts
│   │   │       ├── user.service.ts
│   │   │       └── user.validation.ts
│   │   ├── routes
│   │   │   └── index.ts
│   │   └── utils
│   │       ├── jwt
│   │       │   ├── jwt.ts
│   │       │   ├── setCookie.ts
│   │       │   └── userToken.ts
│   │       ├── templates
│   │       │   ├── forgetPassword.ejs
│   │       │   ├── invoice.ejs
│   │       │   └── otp.ejs
│   │       ├── catchAsync.ts
│   │       ├── generateOtp.ts
│   │       ├── sanitizeUser.ts
│   │       ├── sendEmail.ts
│   │       └── sendResponse.ts
│   ├── types
│   │   └── express.d.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── README.md
├── bun.lock
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

**_ ⚙️ Environment Variables (.env) _**

[.env.example](./.env.example)

**_ Generate secret key _**

```
require('crypto').randomBytes(64).toString('hex')
```

**_ API Routes _**

Auth Routes
Create User: http://localhost:5000/api/v1/auth/create
Login User: http://localhost:5000/api/v1/auth/login
Google Login User: http://localhost:5000/api/v1/auth/google
Forgot Password: http://localhost:5000/api/v1/auth/forgot-password
Rest Password: http://localhost:5000/api/v1/auth/reset-password

User Routes
Set Password: http://localhost:5000/api/v1/user/set-password
Update Profile: http://localhost:5000/api/v1/user/update
Get Me: http://localhost:5000/api/v1/user/me

OTP Routes
Send OTP: http://localhost:5000/api/v1/otp/send-otp
Verify OTP: http://localhost:5000/api/v1/otp/verify-otp

**_ 🧩 Installation _**

```
bun install

bunx prisma generate

bunx prisma migrate dev

```

**_ Running the Server _**

```
bun run dev

```

**_ Production build _**

```
bun run build
bun run start
```

## 👨‍💻 Author

**Abdul Wahed Nur**  
MERN Stack Developer
✉️: <wahednur@gmail.com>
📞: +88 01917839303
[Portfolio](https://wahednur.vercel.app) | [LinkedIn](https://www.linkedin.com/in/wahednur/)

---

Let me know if you want to add API documentation (like Swagger/OpenAPI), deployment instructions (e.g., Docker), or frontend-related details .
