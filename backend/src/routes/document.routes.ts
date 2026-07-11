import { Router } from "express";
import documentController from "../controllers/document.controller";
import { authenticate } from "../middleware/auth.middleware";
import upload from "../middleware/upload";

const router = Router();

router.get("/",authenticate,documentController.getAllDocuments);

router.post(
   "/upload",
   authenticate,
   upload.single("file"),
   documentController.upload
);

router.get("/employee/:id",authenticate,documentController.employeeDocuments);

router.get("/:id",authenticate,documentController.getDocumentById);

router.post("/",authenticate,documentController.createDocument);

router.delete("/:id",authenticate,documentController.deleteDocument);

export default router;