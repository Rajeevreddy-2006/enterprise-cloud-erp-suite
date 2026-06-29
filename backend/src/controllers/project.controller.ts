import { Request, Response } from "express";
import projectService from "../services/project.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class ProjectController {

  getAllProjects = asyncHandler(
    async (req: Request,res: Response) => {
      const projects = await projectService.getAllProjects();
      return res.status(200).json(
        successResponse(projects,"Projects fetched successfully")
      );
    }
  );

  getProjectById = asyncHandler(
    async (req: Request,res: Response) => {
      const project = await projectService.getProjectById(req.params.id as string);
      return res.status(200).json(
        successResponse(project,"Project fetched successfully")
      );
    }
  );

  getProjectProgress = asyncHandler(
    async (req: Request,res: Response) => {
      const progress = await projectService.getProjectProgress(req.params.id as string);
      return res.status(200).json(
        successResponse(progress,"Project progress fetched successfully")
      );
    }
  );

  getProjectDashboard = asyncHandler(
    async (req: Request,res: Response) => {
      const dashboard = await projectService.getProjectDashboard(req.params.id as string);
      return res.status(200).json(
          successResponse(dashboard,"Project dashboard fetched successfully")
        );
    }
  );

  createProject = asyncHandler(
    async (req: Request,res: Response) => {
      const user = (req as any).user;
      const project = await projectService.createProject({...req.body,tenantId: user.tenantId,});
      return res.status(201).json(
        successResponse(project,"Project created successfully")
      );
    }
  );

  updateProject = asyncHandler(
    async (req: Request,res: Response) => {
      const project = await projectService.updateProject(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(project,"Project updated successfully")
      );
    }
  );

  deleteProject = asyncHandler(
    async (req: Request,res: Response) => {
      await projectService.deleteProject(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Project deleted successfully")
      );
    }
  );
}

export default new ProjectController();