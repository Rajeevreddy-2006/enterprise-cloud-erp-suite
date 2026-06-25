import { Router } from "express";
import leaveController from "../controllers/leave.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createLeaveSchema, updateLeaveSchema, } from "../validators/leave.validator";

const router = Router();

router.use(authenticate);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),leaveController.getAllLeaves);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),leaveController.getLeaveById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","EMPLOYEE",]),validate(createLeaveSchema),leaveController.createLeave);

router.put("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),validate(updateLeaveSchema),leaveController.updateLeave);

router.patch("/:id/approve",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),leaveController.approveLeave);

router.patch("/:id/reject",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),leaveController.rejectLeave);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),leaveController.deleteLeave);

export default router;