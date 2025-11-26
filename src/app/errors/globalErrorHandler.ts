/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import ApiError from "./ApiError";
import { IErrorResponse } from "./error.interface";

import envVars from "../config/env";
import handleZodError from "./handleZodError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";
  let errorMessages: { path: string; message: string }[] = [];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.errorMessages;
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error.message ? [{ path: "", message: error.message }] : [];
  }
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
      errorMessages: error.errorMessages,
      stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    });
  }
  // Otherwise, convert to ApiError
  console.error(error);
  const errorResponse: IErrorResponse = {
    success: false,
    message,
    errorMessages,
    stack: envVars.NODE_ENV === "development" ? error.stack : undefined,
  };

  res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
