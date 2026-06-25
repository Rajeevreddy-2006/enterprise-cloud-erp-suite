import prisma from "../config/database";
import { CreateGRNDto, UpdateGRNDto, } from "../types/grn.types";

class GRNRepository {

  async getAllGRNs() {
    return prisma.goodsReceiptNote.findMany({
      include: { purchaseOrder: true, tenant: true, },
    });
  }

  async getGRNById(id: string) {
    return prisma.goodsReceiptNote.findUnique({
      where: { id },
      include: { purchaseOrder: true, tenant: true, },
    });
  }

  async createGRN(data: CreateGRNDto & { grnNumber: string; }) {
    return prisma.goodsReceiptNote.create({ data, });
  }

  async updateGRN(id: string,data: UpdateGRNDto) {
    return prisma.goodsReceiptNote.update({
      where: { id },
      data,
    });
  }

  async deleteGRN(id: string) {
    return prisma.goodsReceiptNote.delete({
      where: { id },
    });
  }

  async getPurchaseOrderById(purchaseOrderId: string) {
    return prisma.purchaseOrder.findUnique({
      where: { id: purchaseOrderId, },
      include: { inventoryItem: true, },
    });
  }

  async updateInventoryQuantity(inventoryItemId: string,quantity: number) {
    return prisma.inventoryItem.update({
      where: { id: inventoryItemId, },
      data: {
        quantity: { increment: quantity, },
      },
    });
  }
}

export default new GRNRepository();