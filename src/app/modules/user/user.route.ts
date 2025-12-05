import { UserRole } from "@prisma/enums";
import { checkAuth } from "app/middlewares/checkAuth";
import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

//Get current user
// router.post("/me");

//Update user profile
// router.post("/profile");
router.patch(
  "/set-password",
  checkAuth(...Object.values(UserRole)),
  UserControllers.setPassword
);

export const UserRoutes = router;
