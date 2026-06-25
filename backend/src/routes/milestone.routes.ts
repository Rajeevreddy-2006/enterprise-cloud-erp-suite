import { Router } from "express";
import milestoneController from "../controllers/milestone.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate,milestoneController.getAllMilestones);

router.get("/:id",authenticate,milestoneController.getMilestoneById);

router.post("/",authenticate,milestoneController.createMilestone);

router.put("/:id",authenticate,milestoneController.updateMilestone);

router.delete("/:id",authenticate,milestoneController.deleteMilestone);

export default router;