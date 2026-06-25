import { Router } from "express";
import inventoryController from "../controllers/inventory.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createInventorySchema, updateInventorySchema, } from "../validators/inventory.validator";

const router = Router();

router.use(authenticate);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),inventoryController.getAllInventoryItems);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),inventoryController.getInventoryItemById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(createInventorySchema),inventoryController.createInventoryItem);

router.put("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(updateInventorySchema),inventoryController.updateInventoryItem);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),inventoryController.deleteInventoryItem);

export default router;