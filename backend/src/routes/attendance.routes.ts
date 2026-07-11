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

router.get("/",attendanceController.getAllAttendances);

router.get("/:id",attendanceController.getAttendanceById);

router.post("/",validate(createAttendanceSchema),attendanceController.createAttendance);

router.put("/:id",validate(updateAttendanceSchema),attendanceController.updateAttendance);

router.delete("/:id",attendanceController.deleteAttendance);

export default router;
//authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),