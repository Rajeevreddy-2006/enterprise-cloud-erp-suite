import { Router } from "express";
import salesOrderController from "../controllers/salesOrder.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createSalesOrderSchema, } from "../validators/salesOrder.validator";

const router = Router();

router.use(authenticate);

router.get("/", salesOrderController.getAllSalesOrders);

router.get("/:id", salesOrderController.getSalesOrderById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(createSalesOrderSchema),salesOrderController.createSalesOrder);

router.patch("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),salesOrderController.updateSalesOrder);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),salesOrderController.deleteSalesOrder);

export default router;