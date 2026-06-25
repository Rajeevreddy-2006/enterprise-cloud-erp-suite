import { Router } from "express";
import reportController from "../controllers/report.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.use(authenticate);

router.get("/financial-summary",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),reportController.getFinancialSummary);

router.get("/inventory-summary",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),reportController.getInventorySummary);

router.get("/employee-summary",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),reportController.getEmployeeSummary);

router.get("/employees/pdf",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),reportController.employeePdf);

router.get("/payrolls/pdf",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","ACCOUNTANT",]),reportController.payrollPdf);

router.get("/inventory/pdf",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),reportController.inventoryPdf);

router.get("/employees/excel",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),reportController.employeeExcel);

router.get("/payrolls/excel",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR","ACCOUNTANT",]),reportController.payrollExcel);

router.get("/inventory/excel",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),reportController.inventoryExcel);

export default router;