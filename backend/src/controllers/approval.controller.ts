import { Request, Response } from "express";
import approvalService from "../services/approval.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class ApprovalController {

  getAllRequests = asyncHandler(
    async (req: Request,res: Response) => {
      const requests = await approvalService.getAllRequests();
      return res.status(200).json(
        successResponse(requests,"Requests fetched successfully")
      );
    });

  approveRequest =asyncHandler(
    async (req: Request,res: Response) => {
      const user = (req as any).user;
      const request = await approvalService.approveRequest(req.params.id as string,user.id,req.body.remarks);
      return res.status(200).json(
        successResponse(request,"Request approved")
      );
    });

  rejectRequest = asyncHandler(
    async (req: Request,res: Response) => {
      const user = (req as any).user;
      const request = await approvalService.rejectRequest(req.params.id as string,user.id,req.body.remarks);
      return res.status(200).json(
        successResponse(request,"Request rejected")
      );
    });
}

export default new ApprovalController();