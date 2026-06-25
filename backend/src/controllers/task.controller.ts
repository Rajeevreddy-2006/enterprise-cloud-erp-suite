import { Request, Response } from "express";
import taskService from "../services/task.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class TaskController {

  getAllTasks = asyncHandler(
    async (req: Request,res: Response) => {
      const tasks = await taskService.getAllTasks();
      return res.status(200).json(
        successResponse(tasks,"Tasks fetched successfully")
      );
    }
  );

  getTaskById = asyncHandler(
    async (req: Request,res: Response) => {
      const task = await taskService.getTaskById(req.params.id as string);
      return res.status(200).json(
        successResponse(task,"Task fetched successfully")
      );
    }
  );

  createTask = asyncHandler(
    async (req: Request,res: Response) => {
      const task = await taskService.createTask(req.body);
      return res.status(201).json(
        successResponse(task,"Task created successfully")
      );
    }
  );

  updateTask = asyncHandler(
    async (req: Request,res: Response) => {
      const task = await taskService.updateTask(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(task,"Task updated successfully")
      );
    }
  );

  deleteTask = asyncHandler(
    async (req: Request,res: Response) => {
      await taskService.deleteTask(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Task deleted successfully")
      );
    }
  );
}

export default new TaskController();