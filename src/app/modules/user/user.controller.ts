import catchAsync from "app/utils/catchAsync";
import sendResponse from "app/utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { UserServices } from "./user.service";

const setPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decodedToken = req.user as JwtPayload;

      const result = await UserServices.setPassword(
        decodedToken.userId,
        req.body
      );
      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Password successfully set",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

export const UserControllers = {
  setPassword,
};
