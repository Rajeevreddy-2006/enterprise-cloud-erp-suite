import { Request, Response } from "express";
import purchaseRequestService from "../services/purchaseRequest.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class PurchaseRequestController {

  getAllRequests = asyncHandler(
    async (req: Request, res: Response) => {
      const requests = await purchaseRequestService.getAllRequests();
      return res.status(200).json(
        successResponse(requests,"Purchase requests fetched successfully")
      );
    }
  );

  getRequestById = asyncHandler(
    async (req: Request, res: Response) => {
      const request = await purchaseRequestService.getRequestById(req.params.id as string);
      return res.status(200).json(
        successResponse(request,"Purchase request fetched successfully")
      );
    }
  );

  createPurchaseOrder = asyncHandler(
    async (req: Request,res: Response) => {
      const po = await purchaseRequestService.createPurchaseOrder(req.params.id as string,req.body.supplierId);
      return res.status(201).json(
        successResponse(po,"Purchase order created")
      );
    }
  );

  createRequest = asyncHandler(
    async (req: Request, res: Response) => {

      const user = (req as any).user;

      const data = {
        ...req.body,
        requestedById: user.id,
        tenantId: user.tenantId,
      };

      const request =
        await purchaseRequestService.createRequest(data);

      return res.status(201).json(
        successResponse(
          request,
          "Purchase request created successfully"
        )
      );
    }
  );

  updateRequest = asyncHandler(
    async (req: Request, res: Response) => {
      const request = await purchaseRequestService.updateRequest(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(request,"Purchase request updated successfully")
      );
    }
  );

  deleteRequest = asyncHandler(
    async (req: Request, res: Response) => {
      await purchaseRequestService.deleteRequest(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Purchase request deleted successfully")
      );
    }
  );

  approveRequest = asyncHandler(
    async (req: Request, res: Response) => {
      const request = await purchaseRequestService.approveRequest(req.params.id as string);
      return res.status(200).json(
        successResponse(request,"Purchase request approved")
      );
    }
  );

  rejectRequest = asyncHandler(
    async (req: Request, res: Response) => {
      const request = await purchaseRequestService.rejectRequest(req.params.id as string);
      return res.status(200).json(
        successResponse(request,"Purchase request rejected")
      );
    }
  );
}

export default new PurchaseRequestController();