import prisma from "../config/database";
import { CreateInventoryDto, UpdateInventoryDto, } from "../types/inventory.types";
import { RoleType } from "../generated/prisma/enums";

class InventoryRepository {

  async getAllInventoryItems(tenantId: string,role: RoleType) {
    if (role === "SUPER_ADMIN") {
      return prisma.inventoryItem.findMany({
        include: { tenant: true, purchaseOrders: true, },
        orderBy: { createdAt: "desc", },
      });
    }
    return prisma.inventoryItem.findMany({
      where: { tenantId, },
      include: { tenant: true, purchaseOrders: true, },
      orderBy: { createdAt: "desc", },
    });
  }

  async getInventoryItemById(id: string) {
    return prisma.inventoryItem.findUnique({
      where: { id },
      include: { tenant: true, purchaseOrders: true, },
    });
  }

  async createInventoryItem(data: CreateInventoryDto) {
    return prisma.inventoryItem.create({
      data,
      include: { tenant: true, purchaseOrders: true, },
    });
  }

  async updateInventoryItem(id: string,data: UpdateInventoryDto) {
    return prisma.inventoryItem.update({
      where: { id },
      data,
      include: { tenant: true, purchaseOrders: true, },
    });
  }

  async deleteInventoryItem(id: string) {
    return prisma.inventoryItem.delete({
      where: { id },
    });
  }
}

export default new InventoryRepository();