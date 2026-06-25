import { Router } from "express";
import projectController from "../controllers/project.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate,projectController.getAllProjects);

router.get("/:id",authenticate,projectController.getProjectById);

router.get("/:id/progress",authenticate,projectController.getProjectProgress);

router.post("/",authenticate,projectController.createProject);

router.put("/:id",authenticate,projectController.updateProject);

router.delete("/:id",authenticate,projectController.deleteProject);

export default router;