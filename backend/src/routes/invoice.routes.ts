import { Router } from "express";
import invoiceController from "../controllers/invoice.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createInvoiceSchema, } from "../validators/invoice.validator";

const router = Router();

router.use(authenticate);

router.get("/",invoiceController.getAllInvoices);

router.get("/:id",invoiceController.getInvoiceById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(createInvoiceSchema),invoiceController.createInvoice);

router.patch("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),invoiceController.updateInvoice);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),invoiceController.deleteInvoice);

export default router;