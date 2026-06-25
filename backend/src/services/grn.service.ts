import grnRepository from "../repositories/grn.repository";
import notificationService from "./notification.service";
import AppError from "../utils/AppError";
import { CreateGRNDto, UpdateGRNDto, } from "../types/grn.types";
import stockMovementService from "./stockMovement.service";

class GRNService {

  async getAllGRNs() {
    return grnRepository.getAllGRNs();
  }

  async getGRNById(id: string) {
    const grn = await grnRepository.getGRNById(id);
    if (!grn) {
      throw new AppError("GRN not found",404);
    }
    return grn;
  }

  async createGRN(data: CreateGRNDto) {
    const purchaseOrder = await grnRepository.getPurchaseOrderById(data.purchaseOrderId);
    if (!purchaseOrder) {
      throw new AppError("Purchase Order not found",404);
    }
    const grn = await grnRepository.createGRN({...data,grnNumber: `GRN-${Date.now()}`, });
    await notificationService.createNotification({
      title: "Goods Received",
      message: grn.grnNumber,
      tenantId: grn.tenantId,
    });
    return grn;
  }

  async updateGRN(id: string,data: UpdateGRNDto) {
    const grn = await this.getGRNById(id);
    const updatedGRN = await grnRepository.updateGRN(id,data);
    if ( grn.status !== "RECEIVED" && data.status === "RECEIVED" ){
        const purchaseOrder = await grnRepository.getPurchaseOrderById(grn.purchaseOrderId);
        if (purchaseOrder?.inventoryItemId) {
        await grnRepository.updateInventoryQuantity(
            purchaseOrder.inventoryItemId,
            grn.quantityReceived
        );
        await stockMovementService.createMovement({
            movementType: "GRN",
            quantity: grn.quantityReceived,
            inventoryItemId:
            purchaseOrder.inventoryItemId,
            tenantId: grn.tenantId,
            remarks: grn.grnNumber,
        });
        }
    }
    return updatedGRN;
  }

  async deleteGRN(id: string) {
    await this.getGRNById(id);
    return grnRepository.deleteGRN(id);
  }
}

export default new GRNService();