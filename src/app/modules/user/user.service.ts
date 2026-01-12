/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "@prisma/client";
import { Provider } from "@prisma/enums";
import envVars from "app/config/env";
import ApiError from "app/errors/ApiError";
import { prisma } from "app/lib/prisma";
import { pagination } from "app/shared/pagination/pagination";
import { sanitizeUser } from "app/utils/sanitizeUser";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { UserRepository } from "./user.repository";
const setPassword = async (userId: string, payload: JwtPayload) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: { auths: true },
  });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  if (user.password) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Password already exists");
  }
  const hasSocialAuth = user.auths.some(
    (a) => a.provider && a.provider !== "credentials"
  );

  if (!hasSocialAuth) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Cannot set password. No social provider found."
    );
  }
  const hasPass = bcrypt.hashSync(payload.newPassword, envVars.BCRYPT_SALT);
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hasPass,
      auths: {
        create: {
          provider: Provider.credentials,
          providerId: user?.email,
        },
      },
    },
  });
  return updateUser;
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    include: {
      auths: true,
      profiles: true,
      addresses: true,
    },
  });

  return sanitizeUser(user as Prisma.UserCreateInput);
};

/** Get all users by Admin and Super Admin */
const getAllUsers = async (query: any) => {
  const { users, total } = await UserRepository.findManyUser(query);
  const paginate = await pagination(query, total);

  return {
    meta: paginate,
    data: users,
  };
};
// Profile Update

const updateProfile = async (
  payload: Partial<Prisma.UserCreateInput>,
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
  });

  return result;
};

export const UserServices = {
  setPassword,
  getMe,
  updateProfile,
  getAllUsers,
};
