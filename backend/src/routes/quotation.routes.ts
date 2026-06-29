import { Router } from "express";
import quotationController from "../controllers/quotation.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createQuotationSchema, updateQuotationSchema, } from "../validators/quotation.validator";

const router = Router();

router.use(authenticate);

router.get("/",quotationController.getAllQuotations);

router.get("/:id",quotationController.getQuotationById);

router.post("/",authorize(["SUPER_ADMIN", "TENANT_ADMIN"]),validate(createQuotationSchema),quotationController.createQuotation);

router.patch("/:id",authorize(["SUPER_ADMIN", "TENANT_ADMIN"]),validate(updateQuotationSchema),quotationController.updateQuotation);

router.delete("/:id",authorize(["SUPER_ADMIN", "TENANT_ADMIN"]),quotationController.deleteQuotation);

export default router;