import { Router } from "express";
import documentController from "../controllers/document.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate,documentController.getAllDocuments);

router.get("/:id",authenticate,documentController.getDocumentById);

router.post("/",authenticate,documentController.createDocument);

router.delete("/:id",authenticate,documentController.deleteDocument);

export default router;