import { Router } from "express";
import dashboardController from "../controllers/dashboard.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.use(authenticate);

router.get("/summary",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT","HR",]),dashboardController.getSummary);

router.get("/payroll-trend",dashboardController.getPayrollTrend);

router.get("/department-analytics",dashboardController.getDepartmentAnalytics);

router.get("/inventory-analytics",dashboardController.getInventoryAnalytics);

router.get("/role-dashboard",authenticate,dashboardController.getRoleDashboard);

export default router;