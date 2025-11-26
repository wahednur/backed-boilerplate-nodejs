import { JwtPayload } from "jsonwebtoken";
import envVars from "../../config/env";

import { StatusCodes } from "http-status-codes";
import { UserStatus } from "../../../../prisma/generated/prisma/enums";
import ApiError from "../../errors/ApiError";
import { prisma } from "../../lib/prisma";
import { IUser } from "../../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";

export const generateUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = { userId: user.id, email: user.email, role: user.role };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRES_IN
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES_IN
  );

  return { accessToken, refreshToken };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: verifiedRefreshToken.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
  }
  if (
    isUserExist.status === UserStatus.BLOCKED ||
    isUserExist.status === UserStatus.INACTIVE
  ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `User is ${isUserExist.status}`
    );
  }
  if (isUserExist.isDeleted === true) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User is deleted");
  }

  const jwtPayload = {
    useId: isUserExist.id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRES_IN
  );
  return accessToken;
};
