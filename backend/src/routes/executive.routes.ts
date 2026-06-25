import { Router } from "express";
import executiveController from "../controllers/executive.controller";
import { authenticate, } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/dashboard",executiveController.getDashboard);

export default router;