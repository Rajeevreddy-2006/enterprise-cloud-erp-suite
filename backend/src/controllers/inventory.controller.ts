import { Request, Response } from "express";
import inventoryService from "../services/inventory.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import auditLogService from "../services/auditLog.service";

class InventoryController {

  getAllInventoryItems = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const inventoryItems = await inventoryService.getAllInventoryItems(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(inventoryItems,"Inventory items fetched successfully")
      );
    }
  );

  getInventoryItemById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const inventoryItem = await inventoryService.getInventoryItemById(id);
      if (!inventoryItem) {
        throw new AppError("Inventory item not found",404);
      }
      return res.status(200).json(
        successResponse(inventoryItem,"Inventory item fetched successfully")
      );
    }
  );

  createInventoryItem = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const inventoryItem = await inventoryService.createInventoryItem({...req.body,tenantId: user.tenantId,});
      await auditLogService.createLog({
        action: "CREATE",
        entity: "INVENTORY_ITEM",
        entityId: inventoryItem.id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(201).json(
        successResponse(inventoryItem,"Inventory item created successfully")
      );
    }
  );

  updateInventoryItem = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      const inventoryItem = await inventoryService.updateInventoryItem(id,req.body);
      await auditLogService.createLog({
        action: "UPDATE",
        entity: "INVENTORY_ITEM",
        entityId: inventoryItem.id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(200).json(
        successResponse(inventoryItem,"Inventory item updated successfully")
      );
    }
  );

  deleteInventoryItem = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      await inventoryService.deleteInventoryItem(id);
      await auditLogService.createLog({
        action: "DELETE",
        entity: "INVENTORY_ITEM",
        entityId: id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(200).json(
        successResponse(null,"Inventory item deleted successfully")
      );
    }
  );

}

export default new InventoryController();