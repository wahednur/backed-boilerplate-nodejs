import { validationRequest } from "app/middlewares/validationRequest";
import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/create",
  validationRequest(createUserZodSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
