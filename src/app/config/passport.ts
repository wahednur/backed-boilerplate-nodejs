import { UserStatus } from "@prisma/enums";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "./../lib/prisma";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
      try {
        const isUserExist = await prisma.user.findUniqueOrThrow({
          where: {
            email: email,
          },
        });
        if (!isUserExist) {
          return done("User does not exist");
        }
        if (
          isUserExist.status === UserStatus.BLOCKED ||
          isUserExist.status === UserStatus.INACTIVE
        ) {
          return done(`User is ${isUserExist.status}`);
        }
        if (isUserExist.isDeleted) {
          done("User is deleted");
        }
        const passwordMatched = await bcrypt.compare(
          password,
          isUserExist.password as string
        );
        if (!passwordMatched) {
          return done("email and password does not match");
        }
        return done(null, isUserExist);
      } catch (err) {
        done(err);
      }
    }
  )
);
