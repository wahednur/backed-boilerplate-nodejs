import { UserRole } from "@prisma/enums";
import { checkAuth } from "app/middlewares/checkAuth";
import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

//Get current user
router.get(
  "/list",
  checkAuth(UserRole.SUPER_ADMIN, UserRole.SUPER_ADMIN),
  UserControllers.getAllUsers
);
router.get("/me", checkAuth(...Object.values(UserRole)), UserControllers.getMe);

// get all user by Admin

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
router.patch(
  "/update-add",
  checkAuth(...Object.values(UserRole)),
  UserControllers.updateAddress
);

export const UserRoutes = router;
