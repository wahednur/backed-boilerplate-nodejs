import envVars from "app/config/env";
import { validationRequest } from "app/middlewares/validationRequest";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { createUserZodSchema } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();
//Create/Register user
router.post(
  "/create",
  validationRequest(createUserZodSchema),
  AuthControllers.createUser
);
// Credentials Login
router.post("/login", AuthControllers.credentialsLogin);

// google login register
router.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: redirect as string,
    })(req, res, next);
  }
);
//Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${envVars.FRONTEND_URL}/login?error?error=There is some issues with your account. Please contact with out support team!`,
  }),
  AuthControllers.googleCallbackController
);

// Forgot password (send email)
// router.post("/forgot-password");

//Reset password (via token)
// router.post("/reset-password");

//Change password (user already logged in)
// router.post("/change-password");

export const AuthRoutes = router;
