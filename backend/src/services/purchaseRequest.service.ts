import purchaseRequestRepository from "../repositories/purchaseRequest.repository";
import notificationService from "./notification.service";
import auditLogService from "./auditLog.service";
import AppError from "../utils/AppError";
import { CreatePurchaseRequestDto, UpdatePurchaseRequestDto, } from "../types/purchaseRequest.types";
import inventoryRepository from "../repositories/inventory.repository";
import purchaseOrderRepository from "../repositories/purchaseOrder.repository";

class PurchaseRequestService {

  async getAllRequests() {
    return purchaseRequestRepository.getAllRequests();
  }

  async getRequestById(id: string) {
    const request = await purchaseRequestRepository.getRequestById(id);
    if (!request) {
      throw new AppError("Purchase request not found",404);
    }
    return request;
  }

  async createRequest(data: CreatePurchaseRequestDto) {
    const inventoryItem = await inventoryRepository.getInventoryItemById(data.inventoryItemId);
    if (!inventoryItem) {
        throw new AppError("Inventory item not found",404);
    }
    const request = await purchaseRequestRepository.createRequest(data);
    await notificationService.createNotification({
        title: "Purchase Request Created",
        message: request.title,
        tenantId: request.tenantId,
    });
    return request;
  }

  async createPurchaseOrder(requestId: string,supplierId: string) {
    const request = await this.getRequestById(requestId);
    if ( request.status !=="APPROVED" ) {
        throw new AppError("Request must be approved",400);
    }
    const inventoryItem = await inventoryRepository.getInventoryItemById(request.inventoryItemId);
    if (!inventoryItem) {
        throw new AppError("Inventory item not found",404);
    }
    const purchaseOrder = await purchaseOrderRepository
        .createFromRequest({
            orderNumber: `PO-${Date.now()}`,
            quantity: request.quantity,
            unitPrice: inventoryItem.unitPrice,
            inventoryItemId: request.inventoryItemId,
            tenantId: request.tenantId,
            supplierId,
        });
    await purchaseRequestRepository.convertToPurchaseOrder(request.id,purchaseOrder.id);
    await notificationService.createNotification({
        title: "Purchase Order Created",
        message: request.title,
        tenantId: request.tenantId,
    });
    return purchaseOrder;
  }

  async updateRequest(id: string,data: UpdatePurchaseRequestDto) {
    await this.getRequestById(id);
    return purchaseRequestRepository.updateRequest(id,data);
  }

  async deleteRequest(id: string) {
    await this.getRequestById(id);
    return purchaseRequestRepository.deleteRequest(id);
  }

  async approveRequest(id: string) {
    const request = await this.getRequestById(id);
    const updated = await purchaseRequestRepository.updateStatus(id,"APPROVED");
    await notificationService.createNotification({
      title: "Purchase Request Approved",
      message: request.title,
      tenantId: request.tenantId,
    });
    return updated;
  }

  async rejectRequest(id: string) {
    const request = await this.getRequestById(id);
    const updated = await purchaseRequestRepository.updateStatus(id,"REJECTED");
    await notificationService.createNotification({
      title: "Purchase Request Rejected",
      message: request.title,
      tenantId: request.tenantId,
    });
    return updated;
  }
}

export default new PurchaseRequestService();