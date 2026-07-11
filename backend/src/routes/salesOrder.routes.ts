import { Router } from "express";
import salesOrderController from "../controllers/salesOrder.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createSalesOrderSchema, } from "../validators/salesOrder.validator";

const router = Router();

router.use(authenticate);

router.get("/", salesOrderController.getAllSalesOrders);

router.patch(
    "/:id/confirm",
    salesOrderController.confirmSalesOrder
);

router.patch(
    "/:id/complete",
    salesOrderController.completeSalesOrder
);

router.patch(
    "/:id/cancel",
    salesOrderController.cancelSalesOrder
);

router.get("/:id", salesOrderController.getSalesOrderById);

router.post("/",validate(createSalesOrderSchema),salesOrderController.createSalesOrder);

router.patch("/:id",salesOrderController.updateSalesOrder);

router.delete("/:id",salesOrderController.deleteSalesOrder);

export default router;
//authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),