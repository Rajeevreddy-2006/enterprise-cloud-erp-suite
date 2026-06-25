import { Request, Response } from "express";
import crmService from "../services/crm.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class CrmController {

  getDashboard = asyncHandler(
    async (req: Request,res: Response) => {
      const user = (req as any).user;
      const dashboard = await crmService.getDashboard(user.tenantId);
      return res.status(200).json(
        successResponse(dashboard,"CRM dashboard fetched successfully")
      );
    }
  );
}

export default new CrmController();