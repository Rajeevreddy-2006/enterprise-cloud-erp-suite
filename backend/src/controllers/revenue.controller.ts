import { Request, Response } from "express";
import revenueService from "../services/revenue.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class RevenueController {
  getDashboard = asyncHandler(
      async (req: Request,res: Response) => {
        const user = (req as any).user;
        const dashboard = await revenueService.getDashboard(user.tenantId);
        return res.status(200).json(
          successResponse(dashboard,"Revenue dashboard fetched successfully")
        );
      }
    );
}

export default new RevenueController();