import { Request, Response } from "express";
import milestoneService from "../services/milestone.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class MilestoneController {

  getAllMilestones = asyncHandler(
    async (req: Request,res: Response) => {
      const milestones = await milestoneService.getAllMilestones();
      return res.status(200).json(
        successResponse(milestones,"Milestones fetched successfully")
      );
    }
  );

  getMilestoneById = asyncHandler(
    async (req: Request,res: Response) => {
      const milestone = await milestoneService.getMilestoneById(req.params.id as string);
      return res.status(200).json(
        successResponse(milestone,"Milestone fetched successfully")
      );
    }
  );

  createMilestone = asyncHandler(
    async (req: Request,res: Response) => {
      const milestone = await milestoneService.createMilestone(req.body);
      return res.status(201).json(
        successResponse(milestone,"Milestone created successfully")
      );
    }
  );

  updateMilestone = asyncHandler(
    async (req: Request,res: Response) => {
      const milestone = await milestoneService.updateMilestone(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(milestone,"Milestone updated successfully")
      );
    }
  );

  deleteMilestone = asyncHandler(
    async (req: Request,res: Response) => {
      await milestoneService.deleteMilestone(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Milestone deleted successfully")
      );
    }
  );
}

export default new MilestoneController();