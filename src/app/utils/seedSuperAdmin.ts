/* eslint-disable no-console */

import { Provider, UserRole, UserStatus } from "@prisma/enums";
import envVars from "app/config/env";
import { prisma } from "app/lib/prisma";
import bcrypt from "bcryptjs";

export const seeSeedSuperAdmin = async () => {
  try {
    const superAdmin = await prisma.user.findUnique({
      where: {
        email: envVars.SUPER_ADMIN_EMAIL,
      },
    });
    if (superAdmin) {
      console.log("Super admin already exist");
      return;
    }
    const hashedPassword = await bcrypt.hash(
      envVars.SUPER_ADMIN_PASS,
      Number(envVars.BCRYPT_SALT)
    );

    const createSuperUser = await prisma.user.create({
      data: {
        email: envVars.SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
        isVerified: true,
        profiles: {
          create: {
            firstName: "Abdul Wahed",
            lastName: "Nur",
            displayName: `Abdul Wahed Nur`,
          },
        },
        auths: {
          create: {
            provider: Provider.credentials,
            providerId: envVars.SUPER_ADMIN_EMAIL,
          },
        },
      },
    });
    console.log("Super Admin created successfully \n");
    console.log(createSuperUser);
  } catch (error) {
    console.log(error);
  }
};
