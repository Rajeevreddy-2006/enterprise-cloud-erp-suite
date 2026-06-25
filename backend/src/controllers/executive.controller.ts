import { Request, Response } from "express";
import executiveService from "../services/executive.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class ExecutiveController {

    getDashboard = asyncHandler(
        async (req: Request,res: Response) => {
            const user = (req as any).user;
            const dashboard = await executiveService.getDashboard(user.tenantId);
            return res.status(200).json(
                successResponse(dashboard,"Executive dashboard fetched successfully")
            );
        }
    );
}

export default new ExecutiveController();