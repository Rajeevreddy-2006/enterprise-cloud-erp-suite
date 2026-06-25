import { Router } from "express";
import stockMovementController from "../controllers/stockMovement.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate,stockMovementController.getAllMovements);

router.get("/:id",authenticate,stockMovementController.getMovementById);

router.post("/",authenticate,stockMovementController.createMovement);

router.delete("/:id",authenticate,stockMovementController.deleteMovement);

export default router;