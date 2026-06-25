import { Router } from "express";
import crmController from "../controllers/crm.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/dashboard",crmController.getDashboard);

export default router;