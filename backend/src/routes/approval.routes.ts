import { Router } from "express";
import approvalController from "../controllers/approval.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.use(authenticate);

router.get("/",approvalController.getAllRequests);

router.patch("/:id/approve",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),approvalController.approveRequest);

router.patch("/:id/reject",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),approvalController.rejectRequest);

export default router;