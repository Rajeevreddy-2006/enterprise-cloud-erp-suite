import { Request, Response } from "express";
import salesOrderService from "../services/salesOrder.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class SalesOrderController {

  getAllSalesOrders = asyncHandler(
    async (req: Request, res: Response) => {
      const orders = await salesOrderService.getAllSalesOrders();
      return res.status(200).json(
        successResponse(orders,"Sales orders fetched successfully")
      );
    }
  );

  getSalesOrderById = asyncHandler(
    async (req: Request, res: Response) => {
      const order = await salesOrderService.getSalesOrderById(req.params.id as string);
      return res.status(200).json(
        successResponse(order,"Sales order fetched successfully")
      );
    }
  );

  confirmSalesOrder = asyncHandler(
    async (req: Request, res: Response) => {

      const salesOrder =
        await salesOrderService.confirmSalesOrder(
          req.params.id as string
        );

      return res.status(200).json(
        successResponse(
          salesOrder,
          "Sales Order confirmed successfully"
        )
      );

    }
  );

  completeSalesOrder = asyncHandler(
    async (req: Request, res: Response) => {

      const salesOrder =
        await salesOrderService.completeSalesOrder(
          req.params.id as string
        );

      return res.status(200).json(
        successResponse(
          salesOrder,
          "Sales Order completed successfully"
        )
      );

    }
  );

  cancelSalesOrder = asyncHandler(
    async (req: Request, res: Response) => {

      const salesOrder =
        await salesOrderService.cancelSalesOrder(
          req.params.id as string
        );

      return res.status(200).json(
        successResponse(
          salesOrder,
          "Sales Order cancelled successfully"
        )
      );

    }
  );

  createSalesOrder = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const orderNumber = `SO-${new Date().getFullYear()}-${Date.now()}`;
      const order =
        await salesOrderService.createSalesOrder({
          ...req.body,
          orderNumber,
          tenantId: user.tenantId
        });
      return res.status(201).json(
        successResponse(order,"Sales order created successfully")
      );
    }
  );

  updateSalesOrder = asyncHandler(
    async (req: Request, res: Response) => {
      const order = await salesOrderService.updateSalesOrder(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(order,"Sales order updated successfully")
      );
    }
  );

  deleteSalesOrder = asyncHandler(
    async (req: Request, res: Response) => {
      await salesOrderService.deleteSalesOrder(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Sales order deleted successfully")
      );
    }
  );
}

export default new SalesOrderController();