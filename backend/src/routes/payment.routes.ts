import { Router } from "express";
import paymentController from "../controllers/payment.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createPaymentSchema, } from "../validators/payment.validator";

const router = Router();

router.use(authenticate);

router.get("/",paymentController.getAllPayments);

router.patch(
    "/:id/complete",
    paymentController.completePayment
);

router.patch(
    "/:id/fail",
    paymentController.failPayment
);

router.get("/:id",paymentController.getPaymentById);

router.post("/",validate(createPaymentSchema),paymentController.createPayment);

router.patch("/:id",paymentController.updatePayment);

router.delete("/:id",paymentController.deletePayment);

export default router;