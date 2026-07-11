import { Router } from "express";

import invoiceController from "../controllers/invoice.controller";

import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";

import {
    createInvoiceSchema,
} from "../validators/invoice.validator";

const router = Router();

/* =====================================================
   Public Routes (Customer)
===================================================== */

router.get(
    "/review/:token",
    invoiceController.reviewInvoice
);

router.post(
    "/pay/:token",
    invoiceController.payInvoice
);

router.post(
    "/fail/:token",
    invoiceController.failInvoice
);

/* =====================================================
   Protected Routes (ERP Users)
===================================================== */

router.use(authenticate);

router.get(
    "/",
    invoiceController.getAllInvoices
);

router.get(
    "/:id",
    invoiceController.getInvoiceById
);

router.post(
    "/",
    validate(createInvoiceSchema),
    invoiceController.createInvoice
);

router.patch(
    "/:id",
    invoiceController.updateInvoice
);

router.post(
    "/:id/send",
    invoiceController.sendInvoice
);

router.patch(
    "/:id/overdue",
    invoiceController.markInvoiceOverdue
);

router.delete(
    "/:id",
    invoiceController.deleteInvoice
);

export default router;