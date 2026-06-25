import { Router } from "express";
import resourceAllocationController from "../controllers/resourceAllocation.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate,resourceAllocationController.getAllAllocations);

router.get("/:id",authenticate,resourceAllocationController.getAllocationById);

router.post("/",authenticate,resourceAllocationController.createAllocation);

router.put("/:id",authenticate,resourceAllocationController.updateAllocation);

router.delete("/:id",authenticate,resourceAllocationController.deleteAllocation);

export default router;