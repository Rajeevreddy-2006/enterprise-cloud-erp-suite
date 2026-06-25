import { Router } from "express";
import essController from "../controllers/ess.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/profile",essController.getMyProfile);

router.get("/attendance",essController.getMyAttendance);

router.get("/leaves",essController.getMyLeaves);

router.get("/payrolls",essController.getMyPayrolls);

export default router;