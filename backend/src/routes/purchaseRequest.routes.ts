import { Router } from "express";
import purchaseRequestController from "../controllers/purchaseRequest.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createPurchaseRequestSchema, } from "../validators/purchaseRequest.validator";

const router = Router();

router.use(authenticate);

router.get("/",purchaseRequestController.getAllRequests);

router.get("/:id",purchaseRequestController.getRequestById);

router.post("/",validate(createPurchaseRequestSchema),purchaseRequestController.createRequest);

router.patch("/:id",purchaseRequestController.updateRequest);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR"]),purchaseRequestController.deleteRequest);

router.patch("/:id/approve",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR"]),purchaseRequestController.approveRequest);

router.patch("/:id/reject",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR"]),purchaseRequestController.rejectRequest);

router.post("/:id/create-po",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT","HR"]),purchaseRequestController.createPurchaseOrder);

export default router;