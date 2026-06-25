import { Request, Response } from "express";
import leadService from "../services/lead.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class LeadController {

  getAllLeads = asyncHandler(
    async (req: Request, res: Response) => {
      const leads = await leadService.getAllLeads();
      return res.status(200).json(
        successResponse(leads,"Leads fetched successfully")
      );
    }
  );

  getLeadById = asyncHandler(
    async (req: Request, res: Response) => {
      const lead = await leadService.getLeadById(req.params.id as string);
      return res.status(200).json(
        successResponse(lead,"Lead fetched successfully")
      );
    }
  );

  createLead = asyncHandler(
    async (req: Request, res: Response) => {
      const lead = await leadService.createLead(req.body);
      return res.status(201).json(
        successResponse(lead,"Lead created successfully")
      );
    }
  );

  updateLead = asyncHandler(
    async (req: Request, res: Response) => {
      const lead = await leadService.updateLead(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(lead,"Lead updated successfully")
      );
    }
  );

  deleteLead = asyncHandler(
    async (req: Request, res: Response) => {
      await leadService.deleteLead(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Lead deleted successfully")
      );
    }
  );
}

export default new LeadController();