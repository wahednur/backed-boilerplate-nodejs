import router from "app/routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import expressSession from "express-session";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import envVars from "./app/config/env";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import NotFoundError from "./app/errors/notFoundError";

import "./app/config/passport";
const app: Application = express();
// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 + 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: envVars.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: envVars.CORS_ORIGIN,
    credentials: true,
  })
);

// Body parser
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Server is running smoothly",
    timestamp: new Date().toISOString(),
  });
});
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Wahed Nur Backed boilerplate server running",
    port: envVars.PORT,
    timestamp: new Date().toISOString(),
    author: "Abdul Wahed Nur",
  });
});

// Application routes
app.use("/api/v1", router);

// Handle 404 routes
app.all(/.*/, (req: Request) => {
  throw new NotFoundError(req.originalUrl);
});

// Global error handler
app.use(globalErrorHandler);

export default app;
