import { Router } from "express";
import taskController from "../controllers/task.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate,taskController.getAllTasks);

router.get("/:id",authenticate,taskController.getTaskById);

router.post("/",authenticate,taskController.createTask);

router.put("/:id",authenticate,taskController.updateTask);

router.delete("/:id",authenticate,taskController.deleteTask);

export default router;