import { QueryBuilder } from "app/shared/query/QueryBuilder";
import catchAsync from "app/utils/catchAsync";
import sendResponse from "app/utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { UserQueryConfig } from "./user.constant";
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

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decodedToken = req.user as JwtPayload;

      const result = await UserServices.getMe(decodedToken.userId);

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Retrieve user info",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

/** Get all users by super admin and admin */
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = QueryBuilder.from(req.query, UserQueryConfig);
      const result = await UserServices.getAllUsers(query);
      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Retrieve user info",
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Update profile
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decodedToken = req.user as JwtPayload;
      const payload = req.body;
      const result = await UserServices.updateProfile(
        payload,
        decodedToken.userId
      );
      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Profile data updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

const updateAddress = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decodedToken = req.user as JwtPayload;
      const payload = req.body;
      const result = await UserServices.updateAddress(
        decodedToken.userId,
        payload
      );
      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Profile data updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);
export const UserControllers = {
  getAllUsers,
  setPassword,
  getMe,
  updateProfile,
  updateAddress,
};
