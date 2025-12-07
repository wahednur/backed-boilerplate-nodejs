import { AuthRoutes } from "app/modules/auth/auth.route";
import { OtpRoutes } from "app/modules/otp/otp.routes";
import { UserRoutes } from "app/modules/user/user.route";
import express from "express";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/otp",
    route: OtpRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
