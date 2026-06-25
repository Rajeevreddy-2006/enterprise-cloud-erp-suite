import { Router } from "express";
import leadController from "../controllers/lead.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createLeadSchema, } from "../validators/lead.validator";

const router = Router();

router.use(authenticate);

router.get("/",leadController.getAllLeads);

router.get("/:id",leadController.getLeadById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),validate(createLeadSchema),leadController.createLead);
 
router.patch("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","HR",]),leadController.updateLead);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),leadController.deleteLead);

export default router;