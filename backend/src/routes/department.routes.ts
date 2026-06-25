import { Router } from "express";
import departmentController from "../controllers/department.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createDepartmentSchema } from "../validators/department.validator";

const router = Router();

router.use(authenticate);

router.get("/", authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]), departmentController.getAllDepartments);

router.get("/:id", authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]), departmentController.getDepartmentById);

router.post("/", authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]), validate(createDepartmentSchema), departmentController.createDepartment);

router.put("/:id", authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]), departmentController.updateDepartment);

router.delete("/:id", authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]), departmentController.deleteDepartment);

export default router;