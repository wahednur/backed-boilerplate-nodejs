import { UserRole } from "@prisma/enums";
import { checkAuth } from "app/middlewares/checkAuth";
import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

//Get current user
router.get("/me", checkAuth(...Object.values(UserRole)), UserControllers.getMe);

//Update user profile
// router.post("/profile");
router.patch(
  "/set-password",
  checkAuth(...Object.values(UserRole)),
  UserControllers.setPassword
);
router.patch(
  "/update",
  checkAuth(...Object.values(UserRole)),
  UserControllers.updateProfile
);

export const UserRoutes = router;
