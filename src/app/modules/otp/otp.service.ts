import envVars from "app/config/env";
import { redisClient } from "app/config/redies.config";
import ApiError from "app/errors/ApiError";
import { prisma } from "app/lib/prisma";
import { generateOtp } from "app/utils/generateOtp";
import { sendEmail } from "app/utils/sendEmail";
import { StatusCodes } from "http-status-codes";

// const OTP_EXPIRATION = 2 * 60;

const sendOtp = async (email: string) => {
  const otp = generateOtp();
  const redisKey = `otp:${email}`;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  await redisClient.set(redisKey, otp, {
    expiration: {
      type: "EX",
      value: Number(envVars.OTP_EXPIRATION) * 60,
    },
  });
  if (user.isVerified) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "You are already verified");
  }
  await sendEmail({
    to: email,
    subject: "Your OTP code",
    templateName: "otp",
    templateData: {
      name: user.name,
      otp: otp,
    },
  });
};

const verifyOtp = async (email: string, otp: string) => {
  const redisKey = `otp:${email}`;
  const saveOtp = await redisClient.get(redisKey);
  if (!saveOtp) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid OTP");
  }

  if (saveOtp !== otp) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid OTP");
  }
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      isVerified: true,
    },
  });
  await redisClient.del(redisKey);
};

export const OtpServices = {
  sendOtp,
  verifyOtp,
};
