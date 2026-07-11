import { Router } from "express";
import attendanceController from "../controllers/attendance.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createAttendanceSchema, updateAttendanceSchema, } from "../validators/attendance.validator";

const router = Router();

router.use(authenticate);

router.get("/employee/:id",attendanceController.employeeAttendance);

router.get("/employee/:id/summary",attendanceController.employeeAttendanceSummary);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),attendanceController.getAllAttendances);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),attendanceController.getAttendanceById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),validate(createAttendanceSchema),attendanceController.createAttendance);

router.put("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),validate(updateAttendanceSchema),attendanceController.updateAttendance);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),attendanceController.deleteAttendance);

export default router;