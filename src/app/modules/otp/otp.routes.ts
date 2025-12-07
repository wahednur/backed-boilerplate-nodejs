import { Router } from "express";
import { OtpControllers } from "./otp.controller";

const router = Router();

router.post("/send-otp", OtpControllers.sendOtp);
router.post("/verify-otp", OtpControllers.verifyOtp);

export const OtpRoutes = router;
