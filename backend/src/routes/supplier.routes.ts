import { Router } from "express";
import supplierController from "../controllers/supplier.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createSupplierSchema, } from "../validators/supplier.validator";

const router = Router();

router.use(authenticate);

router.get("/",supplierController.getAllSuppliers);

router.get("/:id",supplierController.getSupplierById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(createSupplierSchema),supplierController.createSupplier);

router.patch("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),supplierController.updateSupplier);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),supplierController.deleteSupplier);

router.get("/:id/analytics",supplierController.getSupplierAnalytics);

export default router;