import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createTenantSchema, updateTenantSchema, } from "../validators/tenant.validator";
import tenantController from "../controllers/tenant.controller";

const router = Router();

router.use(authenticate);

router.get("/", tenantController.getAllTenants);

router.get("/:id", tenantController.getTenantById);

router.post("/", validate(createTenantSchema), tenantController.createTenant);

router.put("/:id", validate(updateTenantSchema), tenantController.updateTenant);

router.delete("/:id", tenantController.deleteTenant);

export default router;