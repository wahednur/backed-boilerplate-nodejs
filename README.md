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

- Security: CORS, Helmet (optional)

## ✨ Features

- ⚡ Express + TypeScript

- 🗄️ Prisma 7+ ORM (Latest)

- 🐘 PostgreSQL support

- 🔐 JWT Auth (Access + Refresh Token)

- 🍪 HttpOnly Secure Cookies

- 🧩 Zod Request Validation

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
│   └── schema.prisma
├── src
│   ├── app
│   │   ├── config
│   │   │   └── env.ts
│   │   ├── errors
│   │   │   ├── ApiError.ts
│   │   │   ├── error.interface.ts
│   │   │   ├── globalErrorHandler.ts
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
│   │       ├── catchAsync.ts
│   │       └── sendResponse.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── bun.lock
├── package.json
├── eslint.config.mjs
├── prisma.config.ts
└── tsconfig.json
```

**_ ⚙️ Environment Variables (.env) _**

```
DATABASE_URL="postgresql://user:password@localhost:5432/database"
PORT=5000

JWT_ACCESS_SECRET=yourAccessSecret
JWT_REFRESH_SECRET=yourRefreshSecret
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

COOKIE_SECRET=yourCookieSecret
NODE_ENV=development

```

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
