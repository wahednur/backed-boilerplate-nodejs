import catchAsync from "app/utils/catchAsync";
import sendResponse from "app/utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserServices.createUser(req.body);
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

export const UserControllers = {
  createUser,
};
