import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema,registerSchema,forgotPasswordSchema,resetPasswordSchema } from "../validators/auth.validator";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.post("/login",validate(loginSchema),authController.login);

router.post("/register",validate(registerSchema),authController.register);

router.post("/refresh",authController.refreshToken);

router.patch("/change-password",authenticate,authController.changePassword);

router.post("/invite",authenticate,authorize(["SUPER_ADMIN","HR"]),authController.inviteUser);

router.post("/accept-invite",authController.acceptInvite);

router.post("/resend-invite/:id",authenticate,authorize(["SUPER_ADMIN","HR"]),authController.resendInvite);

router.post("/forgot-password",validate(forgotPasswordSchema),authController.forgotPassword);

router.post("/reset-password",validate(resetPasswordSchema),authController.resetPassword);

router.post("/logout",authenticate,authController.logout);

export default router;