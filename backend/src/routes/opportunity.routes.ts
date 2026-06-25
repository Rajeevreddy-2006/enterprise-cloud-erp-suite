import { Router } from "express";
import opportunityController from "../controllers/opportunity.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createOpportunitySchema, } from "../validators/opportunity.validator";

const router = Router();

router.use(authenticate);

router.get("/",opportunityController.getAllOpportunities);

router.get("/:id",opportunityController.getOpportunityById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),validate(createOpportunitySchema),opportunityController.createOpportunity);

router.patch("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),opportunityController.updateOpportunity);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),opportunityController.deleteOpportunity);

export default router;