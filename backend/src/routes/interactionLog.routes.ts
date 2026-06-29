import { Router } from "express";
import interactionLogController from "../controllers/interactionLog.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createInteractionLogSchema, updateInteractionLogSchema, } from "../validators/interactionLog.validator";

const router = Router();

router.use(authenticate);

router.get("/",interactionLogController.getAllInteractionLogs);

router.get("/:id",interactionLogController.getInteractionLogById);

router.post("/",authorize(["SUPER_ADMIN", "TENANT_ADMIN", "HR"]),validate(createInteractionLogSchema),interactionLogController.createInteractionLog);

router.patch("/:id",authorize(["SUPER_ADMIN", "TENANT_ADMIN", "HR"]),validate(updateInteractionLogSchema),interactionLogController.updateInteractionLog);

router.delete("/:id",authorize(["SUPER_ADMIN", "TENANT_ADMIN"]),interactionLogController.deleteInteractionLog);

export default router;