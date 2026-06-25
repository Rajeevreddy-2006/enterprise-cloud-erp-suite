import prisma from "../config/database";
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto, } from "../types/purchaseOrder.types";
import { RoleType } from "../generated/prisma/enums";
import { Prisma } from "../generated/prisma/client";

class PurchaseOrderRepository {

  async getAllPurchaseOrders(tenantId: string,role: RoleType) {
    if (role === "SUPER_ADMIN") {
      return prisma.purchaseOrder.findMany({
        include: { tenant: true, inventoryItem: true, },
        orderBy: { createdAt: "desc", },
      });
    }
    return prisma.purchaseOrder.findMany({
      where: { tenantId, },
      include: { tenant: true, inventoryItem: true, },
      orderBy: { createdAt: "desc", },
    });
  }

  async getPurchaseOrderById(id: string) {
    return prisma.purchaseOrder.findUnique({
      where: { id },
      include: { tenant: true, inventoryItem: true, },
    });
  }

  async createFromRequest(data: {
    orderNumber: string;
    quantity: number;
    unitPrice: Prisma.Decimal;
    inventoryItemId: string;
    tenantId: string;
    supplierId: string;
  }) {
    return prisma.purchaseOrder.create({
        data: {
        orderNumber: data.orderNumber,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        inventoryItemId: data.inventoryItemId,
        tenantId: data.tenantId,
        supplierId: data.supplierId,
        },
    });
  }

  async createPurchaseOrder(data: CreatePurchaseOrderDto) {
    return prisma.purchaseOrder.create({
      data,
      include: { tenant: true, inventoryItem: true, },
    });
  }

  async updatePurchaseOrder(id: string,data: UpdatePurchaseOrderDto) {
    return prisma.purchaseOrder.update({
      where: { id },
      data,
      include: { tenant: true, inventoryItem: true, },
    });
  }

  async deletePurchaseOrder(id: string) {
    return prisma.purchaseOrder.delete({
      where: { id },
    });
  }

  // Inventory Helpers
  async getInventoryItemById(inventoryItemId: string) {
    return prisma.inventoryItem.findUnique({
      where: { id: inventoryItemId, },
    });
  }

  async updateInventoryQuantity(inventoryItemId: string,quantity: number) {
    return prisma.inventoryItem.update({
      where: { id: inventoryItemId, },
      data: { quantity, },
    });
  }
}

export default new PurchaseOrderRepository();