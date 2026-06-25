import purchaseOrderRepository from "../repositories/purchaseOrder.repository";
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto, } from "../types/purchaseOrder.types";
import { RoleType } from "../generated/prisma/enums";
import AppError from "../utils/AppError";

class PurchaseOrderService {

  async getAllPurchaseOrders(tenantId: string,role: RoleType) {
    return purchaseOrderRepository.getAllPurchaseOrders(tenantId,role);
  }

  async getPurchaseOrderById(id: string) {
    return purchaseOrderRepository.getPurchaseOrderById(id);
  }

  async createPurchaseOrder(data: CreatePurchaseOrderDto) {
    const inventoryItem = await purchaseOrderRepository.getInventoryItemById(data.inventoryItemId);
    if (!inventoryItem) {
      throw new AppError("Inventory item not found",404);
    }
    return purchaseOrderRepository.createPurchaseOrder(data);
  }

  async updatePurchaseOrder(id: string,data: UpdatePurchaseOrderDto) {
    const purchaseOrder = await purchaseOrderRepository.getPurchaseOrderById(id);
    if (!purchaseOrder) {
      throw new AppError("Purchase Order not found",404);
    }
    if (purchaseOrder.status !== "RECEIVED" && data.status === "RECEIVED") {
      const inventoryItem = await purchaseOrderRepository.getInventoryItemById(purchaseOrder.inventoryItemId);
      if (!inventoryItem) {
        throw new AppError("Inventory item not found",404);
      }
      await purchaseOrderRepository.updateInventoryQuantity(inventoryItem.id,inventoryItem.quantity +purchaseOrder.quantity);
    }
    return purchaseOrderRepository.updatePurchaseOrder(id,data);
  }

  async deletePurchaseOrder(id: string) {
    const purchaseOrder = await purchaseOrderRepository.getPurchaseOrderById(id);
    if (!purchaseOrder) {
      throw new AppError("Purchase Order not found",404);
    }
    return purchaseOrderRepository.deletePurchaseOrder(id);
  }
}

export default new PurchaseOrderService();