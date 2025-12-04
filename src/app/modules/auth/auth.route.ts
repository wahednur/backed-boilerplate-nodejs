import envVars from "app/config/env";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
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
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${envVars.FRONTEND_URL}/login?error?error=There is some issues with your account. Please contact with out support team!`,
  }),
  AuthControllers.googleCallbackController
);

export const AuthRoutes = router;
