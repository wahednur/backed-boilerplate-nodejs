import { Prisma } from "@prisma/client";
import { prisma } from "app/lib/prisma";
import { BuildQuery } from "app/shared/pagination/types";
import { sanitizeUser } from "app/utils/sanitizeUser";

const findManyUser = async (
  query: BuildQuery<Prisma.UserWhereInput, Prisma.UserOrderByWithRelationInput>
) => {
  const data = await prisma.user.findMany({
    where: query.where,
    skip: query.pagination.skip,
    take: query.pagination.take,
    orderBy: query.orderBy,
  });

  const total = await prisma.user.count({
    where: query.where,
  });
  const users = data.map(sanitizeUser);

  return { users, total };
};

export const UserRepository = {
  findManyUser,
};
