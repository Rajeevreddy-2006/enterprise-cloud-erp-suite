import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema,registerSchema,forgotPasswordSchema,resetPasswordSchema } from "../validators/auth.validator";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/login",validate(loginSchema),authController.login);

router.post("/register",validate(registerSchema),authController.register);

router.post("/refresh",authController.refreshToken);

router.post("/forgot-password",validate(forgotPasswordSchema),authController.forgotPassword);

router.post("/reset-password",validate(resetPasswordSchema),authController.resetPassword);

router.post("/logout",authenticate,authController.logout);

export default router;