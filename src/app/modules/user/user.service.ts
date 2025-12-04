/* eslint-disable @typescript-eslint/no-unused-vars */
import envVars from "app/config/env";
import ApiError from "app/errors/ApiError";
import { prisma } from "app/lib/prisma";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { createUserZodSchema } from "./user.validation";

type createUserInput = z.infer<typeof createUserZodSchema>;
const createUser = async (payload: createUserInput) => {
  const { email, password, firstName, lastName } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
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
      auths: {
        create: {
          provider: "credentials",
          providerId: email,
        },
      },
    },
  });
  const { password: _, ...withoutPassword } = user;
  return withoutPassword;
};

export const UserServices = {
  createUser,
};
