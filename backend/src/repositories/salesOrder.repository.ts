import prisma from "../config/database";
import { CreateSalesOrderDto, UpdateSalesOrderDto, } from "../types/salesOrder.types";

class SalesOrderRepository {

  async getAllSalesOrders() {
    return prisma.salesOrder.findMany({
      include: { customer: true, inventoryItem: true, tenant: true,},
    });
  }

  async getSalesOrderById(id: string) {
    return prisma.salesOrder.findUnique({
      where: { id },
      include: { customer: true, inventoryItem: true, tenant: true, },
    });
  }

  async createSalesOrder(data: any) {
    return prisma.salesOrder.create({ data, });
  }

  async updateSalesOrder(id: string,data: UpdateSalesOrderDto) {
    return prisma.salesOrder.update({
      where: { id },
      data,
    });
  }

  async deleteSalesOrder(id: string) {
    return prisma.salesOrder.delete({
      where: { id },
    });
  }
}

export default new SalesOrderRepository();