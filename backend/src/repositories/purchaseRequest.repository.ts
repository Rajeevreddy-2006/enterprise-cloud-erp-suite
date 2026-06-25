import prisma from "../config/database";
import { CreatePurchaseRequestDto, UpdatePurchaseRequestDto, } from "../types/purchaseRequest.types";

class PurchaseRequestRepository {

  async getAllRequests() {
    return prisma.purchaseRequest.findMany({
      include: { requestedBy: true, tenant: true, },
    });
  }

  async getRequestById(id: string) {
    return prisma.purchaseRequest.findUnique({
      where: { id },
      include: { requestedBy: true, tenant: true, },
    });
  }

  async convertToPurchaseOrder(requestId: string,purchaseOrderId: string) {
    return prisma.purchaseRequest.update({
        where: { id: requestId },
        data: { purchaseOrderId, },
    });
  }

  async createRequest(data: CreatePurchaseRequestDto) {
    return prisma.purchaseRequest.create({ data, });
  }

  async updateRequest(id: string,data: UpdatePurchaseRequestDto) {
    return prisma.purchaseRequest.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: string,status:"APPROVED" |"REJECTED") {
    return prisma.purchaseRequest.update({
      where: { id },
      data: { status },
    });
  }

  async deleteRequest(id: string) {
    return prisma.purchaseRequest.delete({
      where: { id },
    });
  }
}

export default new PurchaseRequestRepository();