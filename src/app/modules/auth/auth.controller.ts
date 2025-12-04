/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import envVars from "app/config/env";
import ApiError from "app/errors/ApiError";
import catchAsync from "app/utils/catchAsync";
import { setCookie } from "app/utils/jwt/setCookie";
import { generateUserTokens } from "app/utils/jwt/userToken";
import sendResponse from "app/utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import { AuthServices } from "./auth.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthServices.createUser(req.body);
      sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: `"${user.email}" account created successfully`,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }
);

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return next(new ApiError(StatusCodes.UNAUTHORIZED, err));
      }
      if (!user) {
        return next(new ApiError(StatusCodes.UNAUTHORIZED, info.message));
      }
      const userToken = await generateUserTokens(user);
      setCookie(res, userToken);
      const { password: _, userWithoutPass } = user;

      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User login successfully",
        data: {
          accessToken: userToken.accessToken,
          refreshToken: userToken.refreshToken,
          user: userWithoutPass,
        },
      });
    })(req, res, next);
  }
);

const googleCallbackController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }
    const user = req.user;

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    const tokenInfo = generateUserTokens(user);

    setCookie(res, tokenInfo);

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  }
);

export const AuthControllers = {
  createUser,
  credentialsLogin,
  googleCallbackController,
};
