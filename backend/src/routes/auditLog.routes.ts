import { Router } from "express";
import auditLogController from "../controllers/auditLog.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.use(authenticate);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),auditLogController.getAllLogs);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),auditLogController.getLogById);

export default router;