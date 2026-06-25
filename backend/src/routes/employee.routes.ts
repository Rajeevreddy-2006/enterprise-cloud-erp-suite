import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createEmployeeSchema } from "../validators/employee.validator";
import employeeController from "../controllers/employee.controller";

const router = Router();

router.use(authenticate);

router.get("/", authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","ACCOUNTANT",]), employeeController.getAllEmployees);

router.get("/:id", authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","ACCOUNTANT",]), employeeController.getEmployeeById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),validate(createEmployeeSchema),employeeController.createEmployee);

router.put("/:id", authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]), employeeController.updateEmployee);

router.delete("/:id", authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]), employeeController.deleteEmployee);

export default router;