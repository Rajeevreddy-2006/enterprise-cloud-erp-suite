import { Router } from "express";
import customerController from "../controllers/customer.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createCustomerSchema, } from "../validators/customer.validator";

const router = Router();

router.use(authenticate);

router.get("/",customerController.getAllCustomers);

router.get("/:id",customerController.getCustomerById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),validate(createCustomerSchema),customerController.createCustomer);

router.patch("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),customerController.updateCustomer);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),customerController.deleteCustomer);

export default router;