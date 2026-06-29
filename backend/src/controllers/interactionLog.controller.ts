import { Request, Response } from "express";
import interactionLogService from "../services/interactionLog.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class InteractionLogController {

  getAllInteractionLogs = asyncHandler(
    async (req: Request,res: Response) => {
      const interactionLogs = await interactionLogService.getAllInteractionLogs();
      return res.status(200).json(
        successResponse(interactionLogs,"Interaction logs fetched successfully")
      );
    }
  );

  getInteractionLogById = asyncHandler(
    async (req: Request,res: Response) => {
      const interactionLog = await interactionLogService.getInteractionLogById(req.params.id as string);
      return res.status(200).json(
        successResponse(interactionLog,"Interaction log fetched successfully")
      );
    }
  );

  createInteractionLog = asyncHandler(
    async (req: Request,res: Response) => {
      const interactionLog = await interactionLogService.createInteractionLog(req.body);
      return res.status(201).json(
        successResponse(interactionLog,"Interaction log created successfully")
      );
    }
  );

  updateInteractionLog = asyncHandler(
    async (req: Request,res: Response) => {
      const interactionLog = await interactionLogService.updateInteractionLog(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(interactionLog,"Interaction log updated successfully")
      );
    }
  );

  deleteInteractionLog = asyncHandler(
    async (req: Request,res: Response) => {
      await interactionLogService.deleteInteractionLog(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Interaction log deleted successfully")
      );
    }
  );
}

export default new InteractionLogController();