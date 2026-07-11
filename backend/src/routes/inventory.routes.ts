import { Router } from "express";
import inventoryController from "../controllers/inventory.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createInventorySchema, updateInventorySchema, } from "../validators/inventory.validator";

const router = Router();

router.use(authenticate);

router.get("/",inventoryController.getAllInventoryItems);

router.get("/:id",inventoryController.getInventoryItemById);

router.post("/",validate(createInventorySchema),inventoryController.createInventoryItem);

router.put("/:id",validate(updateInventorySchema),inventoryController.updateInventoryItem);

router.delete("/:id",inventoryController.deleteInventoryItem);

export default router;

//authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),