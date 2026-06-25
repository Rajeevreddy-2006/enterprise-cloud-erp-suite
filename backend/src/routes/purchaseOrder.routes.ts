import { Router } from "express";
import purchaseOrderController from "../controllers/purchaseOrder.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createPurchaseOrderSchema, updatePurchaseOrderSchema, } from "../validators/purchaseOrder.validator";

const router = Router();

router.use(authenticate);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),purchaseOrderController.getAllPurchaseOrders);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),purchaseOrderController.getPurchaseOrderById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(createPurchaseOrderSchema),purchaseOrderController.createPurchaseOrder);

router.put("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(updatePurchaseOrderSchema),purchaseOrderController.updatePurchaseOrder);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),purchaseOrderController.deletePurchaseOrder);

export default router;