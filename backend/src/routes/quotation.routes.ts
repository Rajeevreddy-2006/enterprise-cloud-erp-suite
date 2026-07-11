import { Router } from "express";

import quotationController from "../controllers/quotation.controller";

import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";

import {
    createQuotationSchema,
    updateQuotationSchema,
    acceptQuotationSchema,
    rejectQuotationSchema,
} from "../validators/quotation.validator";

const router = Router();

/* ======================================================
   Public Routes (Customer)
====================================================== */

router.get(
    "/review/:token",
    quotationController.reviewQuotation
);

router.post(
    "/accept/:token",
    validate(acceptQuotationSchema),
    quotationController.acceptQuotation
);

router.post(
    "/reject/:token",
    validate(rejectQuotationSchema),
    quotationController.rejectQuotation
);

/* ======================================================
   Protected Routes (ERP Users)
====================================================== */

router.use(authenticate);

router.get(
    "/",
    quotationController.getAllQuotations
);

router.get(
    "/:id",
    quotationController.getQuotationById
);

router.post(
    "/",
    validate(createQuotationSchema),
    quotationController.createQuotation
);

router.patch(
    "/:id",
    validate(updateQuotationSchema),
    quotationController.updateQuotation
);

router.post(
    "/:id/send",
    quotationController.sendQuotation
);

router.delete(
    "/:id",
    quotationController.deleteQuotation
);

export default router;