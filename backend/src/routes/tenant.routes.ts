import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createTenantSchema, updateTenantSchema, } from "../validators/tenant.validator";
import tenantController from "../controllers/tenant.controller";

const router = Router();

router.use(authenticate);

router.get("/", authorize(["SUPER_ADMIN"]), tenantController.getAllTenants);

router.get("/:id", authorize(["SUPER_ADMIN"]), tenantController.getTenantById);

router.post("/", authorize(["SUPER_ADMIN"]), validate(createTenantSchema), tenantController.createTenant);

router.put("/:id", authorize(["SUPER_ADMIN"]), validate(updateTenantSchema), tenantController.updateTenant);

router.delete("/:id", authorize(["SUPER_ADMIN"]), tenantController.deleteTenant);

export default router;