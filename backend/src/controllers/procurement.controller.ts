import { Request, Response } from "express";
import procurementService from "../services/procurement.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class ProcurementController {

    getDashboard = asyncHandler(
        async (req: Request,res: Response) => {
            const user = (req as any).user;
            const dashboard = await procurementService.getDashboard(user.tenantId);
            return res.status(200).json(
                successResponse(dashboard,"Procurement dashboard fetched successfully")
            );
        }
    );
}

export default new ProcurementController();