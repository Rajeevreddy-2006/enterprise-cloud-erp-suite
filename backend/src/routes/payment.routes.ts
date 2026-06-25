import { Router } from "express";
import paymentController from "../controllers/payment.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createPaymentSchema, } from "../validators/payment.validator";

const router = Router();

router.use(authenticate);

router.get("/",paymentController.getAllPayments);

router.get("/:id",paymentController.getPaymentById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(createPaymentSchema),paymentController.createPayment);

router.patch("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),paymentController.updatePayment);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),paymentController.deletePayment);

export default router;