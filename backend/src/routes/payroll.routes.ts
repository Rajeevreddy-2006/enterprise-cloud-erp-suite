import { Router } from "express";
import payrollController from "../controllers/payroll.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createPayrollSchema, updatePayrollSchema, } from "../validators/payroll.validator";

const router = Router();

router.use(authenticate);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","ACCOUNTANT",]),payrollController.getAllPayrolls);

router.get(

"/:id/payslip/download",

authorize([

"SUPER_ADMIN",

"TENANT_ADMIN",

"HR",

"EMPLOYEE"

]),

payrollController

.downloadPayslip

);

router.get("/summary",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR"]),payrollController.getPayrollSummary);

router.get("/employee/:id",payrollController.employeePayrolls);

router.get("/details/:id",payrollController.getPayroll);

router.patch("/:id/process",authorize(["SUPER_ADMIN"]),payrollController.processPayroll);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","ACCOUNTANT",]),payrollController.getPayrollById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),validate(createPayrollSchema),payrollController.createPayroll);

router.put("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","ACCOUNTANT",]),validate(updatePayrollSchema),payrollController.updatePayroll);

router.patch("/:id/pay",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),payrollController.markAsPaid);

router.get("/:id/payslip",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","ACCOUNTANT","EMPLOYEE",]),payrollController.generatePayslip);

// router.get("/:id/payslip/download",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","EMPLOYEE",]),payrollController.downloadPayslip);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),payrollController.deletePayroll);

export default router;