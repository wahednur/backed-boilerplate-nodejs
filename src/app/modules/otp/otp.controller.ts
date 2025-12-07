import catchAsync from "app/utils/catchAsync";
import sendResponse from "app/utils/sendResponse";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { OtpServices } from "./otp.service";

const sendOtp = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  await OtpServices.sendOtp(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "OTP successfully send",
    data: null,
  });
});
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  await OtpServices.verifyOtp(email, otp);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "You are now verified",
    data: null,
  });
});

export const OtpControllers = {
  sendOtp,
  verifyOtp,
};
