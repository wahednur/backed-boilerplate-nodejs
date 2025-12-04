/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiError from "app/errors/ApiError";
import catchAsync from "app/utils/catchAsync";
import { setCookie } from "app/utils/jwt/setCookie";
import { generateUserTokens } from "app/utils/jwt/userToken";
import sendResponse from "app/utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";

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
        data: userWithoutPass,
      });
    })(req, res, next);
  }
);

export const AuthControllers = {
  credentialsLogin,
};
