/* eslint-disable @typescript-eslint/no-unused-vars */

import { Prisma } from "@prisma/client";

export const sanitizeUser = (user: Prisma.UserCreateInput) => {
  if (!user) return null;

  const { password, ...rest } = user;
  return rest;
};
