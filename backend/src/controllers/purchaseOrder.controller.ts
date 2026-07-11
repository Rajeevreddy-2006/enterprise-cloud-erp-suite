import { Request, Response } from "express";
import purchaseOrderService from "../services/purchaseOrder.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import auditLogService from "../services/auditLog.service";

class PurchaseOrderController {

  getAllPurchaseOrders = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const purchaseOrders = await purchaseOrderService.getAllPurchaseOrders(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(purchaseOrders,"Purchase orders fetched successfully")
      );
    }
  );

  getPurchaseOrderById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const purchaseOrder = await purchaseOrderService.getPurchaseOrderById(id);
      if (!purchaseOrder) {
        throw new AppError("Purchase order not found",404);
      }
      return res.status(200).json(
        successResponse(purchaseOrder,"Purchase order fetched successfully")
      );
    }
  );

  createPurchaseOrder = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const purchaseOrder = await purchaseOrderService.createPurchaseOrder({...req.body,tenantId: user.tenantId,orderNumber: `PO-${Date.now()}`});
      return res.status(201).json(
        successResponse(purchaseOrder,"Purchase order created successfully")
      );
    }
  );

  updatePurchaseOrder = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      const purchaseOrder = await purchaseOrderService.updatePurchaseOrder(id,req.body);
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "UPDATE",
            entity: "PURCHASE_ORDER",
            entityId: purchaseOrder.id,
        }
      );
      return res.status(200).json(
        successResponse(purchaseOrder,"Purchase order updated successfully")
      );
    }
  );

  deletePurchaseOrder = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      await purchaseOrderService.deletePurchaseOrder(id);
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "DELETE",
            entity: "PURCHASE_ORDER",
            entityId: id,
        }
      );
      return res.status(200).json(
        successResponse(null,"Purchase order deleted successfully")
      );
    }
  );

}

export default new PurchaseOrderController();