import { Router } from "express";
import procurementController from "../controllers/procurement.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/dashboard",procurementController.getDashboard);

export default router;