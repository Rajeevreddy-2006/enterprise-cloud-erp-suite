import { Request, Response } from "express";
import opportunityService from "../services/opportunity.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class OpportunityController {
  getAllOpportunities = asyncHandler(
    async (req: Request, res: Response) => {
      const opportunities = await opportunityService.getAllOpportunities();
      return res.status(200).json(
        successResponse(opportunities,"Opportunities fetched successfully")
      );
    }
  );

  getOpportunityById = asyncHandler(
    async (req: Request, res: Response) => {
      const opportunity = await opportunityService.getOpportunityById(req.params.id as string);
      return res.status(200).json(
        successResponse(opportunity,"Opportunity fetched successfully")
      );
    }
  );

  createOpportunity = asyncHandler(
    async (req: Request, res: Response) => {
      const opportunity = await opportunityService.createOpportunity(req.body);
      return res.status(201).json(
        successResponse(opportunity,"Opportunity created successfully")
      );
    }
  );

  updateOpportunity = asyncHandler(
    async (req: Request, res: Response) => {
      const opportunity = await opportunityService.updateOpportunity(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(opportunity,"Opportunity updated successfully")
      );
    }
  );

  deleteOpportunity = asyncHandler(
    async (req: Request, res: Response) => {
      await opportunityService.deleteOpportunity(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Opportunity deleted successfully")
      );
    }
  );
}

export default new OpportunityController();