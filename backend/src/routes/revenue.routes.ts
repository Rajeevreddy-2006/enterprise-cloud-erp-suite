import { Router } from "express";
import revenueController from "../controllers/revenue.controller";
import { authenticate, } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/dashboard",revenueController.getDashboard);

export default router;