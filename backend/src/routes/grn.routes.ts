import { Router } from "express";
import grnController from "../controllers/grn.controller";
import { authenticate, } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate,grnController.getAllGRNs);

router.get("/:id",authenticate,grnController.getGRNById);

router.post("/",authenticate,grnController.createGRN);

router.put("/:id",authenticate,grnController.updateGRN);

router.delete("/:id",authenticate,grnController.deleteGRN);

export default router;