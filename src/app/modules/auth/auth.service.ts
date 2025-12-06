/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider, UserRole, UserStatus } from "@prisma/enums";
import envVars from "app/config/env";
import ApiError from "app/errors/ApiError";
import { prisma } from "app/lib/prisma";
import { sendEmail } from "app/utils/sendEmail";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import z from "zod";
import { createUserZodSchema } from "../user/user.validation";

type createUserInput = z.infer<typeof createUserZodSchema>;
const createUser = async (payload: createUserInput) => {
  const { email, password, firstName, lastName } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User already exist");
  }
  const hasPass = bcrypt.hashSync(password as string, envVars.BCRYPT_SALT);

  const user = await prisma.user.create({
    data: {
      email,
      password: hasPass,
      profiles: {
        create: {
          firstName: firstName,
          lastName: lastName,
        },
      },
      role: UserRole.USER,
      auths: {
        create: {
          provider: Provider.credentials,
          providerId: email,
        },
      },
    },
  });
  const { password: _, ...withoutPassword } = user;
  return withoutPassword;
};

const forgotPassword = async (email: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  if (
    isUserExist.status === UserStatus.BLOCKED ||
    isUserExist.status === UserStatus.INACTIVE
  ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      ` User is ${isUserExist.status}`
    );
  }
  if (isUserExist.isDeleted) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User is deleted");
  }

  const jwtPayload = {
    userId: isUserExist.id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const resetToken = jwt.sign(jwtPayload, envVars.JWT_SECRET, {
    expiresIn: "10m",
  });

  const resetUILink = `${envVars.FRONTEND_URL}/reset-password?id=${isUserExist.id}&token=${resetToken}`;
  sendEmail({
    to: isUserExist.email,
    subject: "Password Reset Link",
    templateName: "forgetPassword",
    templateData: {
      name: isUserExist.name,
      resetUILink: resetUILink,
    },
  });
};
const resetPassword = async (
  userId: string,
  decodedToken: JwtPayload,
  newPassword: string
) => {
  if (userId !== decodedToken.userId) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorize");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  const hashPass = bcrypt.hashSync(newPassword, envVars.BCRYPT_SALT);
  await prisma.user.update({
    where: {
      id: decodedToken.userId,
    },
    data: {
      password: hashPass,
    },
  });
  return { message: "Password reset successfully" };
};

export const AuthServices = {
  createUser,
  forgotPassword,
  resetPassword,
};
