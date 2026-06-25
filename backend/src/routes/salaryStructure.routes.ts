import { Router } from "express";
import salaryStructureController from "../controllers/salaryStructure.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createSalaryStructureSchema, updateSalaryStructureSchema, } from "../validators/salaryStructure.validator";

const router = Router();

router.use(authenticate);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),salaryStructureController.getAllSalaryStructures);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),salaryStructureController.getSalaryStructureById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),validate(createSalaryStructureSchema),salaryStructureController.createSalaryStructure);

router.put("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),validate(updateSalaryStructureSchema),salaryStructureController.updateSalaryStructure);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),salaryStructureController.deleteSalaryStructure);

export default router;