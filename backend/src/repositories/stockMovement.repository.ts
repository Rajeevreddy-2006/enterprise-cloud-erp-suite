import prisma from "../config/database";
import { CreateStockMovementDto } from "../types/stockMovement.types";

class StockMovementRepository {

  async getAllMovements() {
    return prisma.stockMovement.findMany({
      include: { inventoryItem: true, tenant: true, },
      orderBy: { createdAt: "desc", },
    });
  }

  async getMovementById(id: string) {
    return prisma.stockMovement.findUnique({
      where: { id },
      include: { inventoryItem: true, tenant: true, },
    });
  }

  async createMovement(data: CreateStockMovementDto) {
    return prisma.stockMovement.create({ data, });
  }

  async deleteMovement(id: string) {
    return prisma.stockMovement.delete({
      where: { id },
    });
  }
}

export default new StockMovementRepository();