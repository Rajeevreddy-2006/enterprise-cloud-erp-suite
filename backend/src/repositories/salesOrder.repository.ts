import prisma from "../config/database";
import { CreateSalesOrderDto, UpdateSalesOrderDto, } from "../types/salesOrder.types";

class SalesOrderRepository {

  async getAllSalesOrders() {
    return prisma.salesOrder.findMany({
      include: { customer: true, inventoryItem: true, invoice: true, tenant: true, },
    });
  }

  async getSalesOrderById(id: string) {
    return prisma.salesOrder.findUnique({
      where: { id },
      include: { customer: true, inventoryItem: true, invoice: true, tenant: true, },
    });
  }

  async getSalesOrderByNumber(orderNumber: string) {
    return prisma.salesOrder.findUnique({
      where: { orderNumber, },
    });
  }

  async createSalesOrder(data: {
    orderNumber: string;
    customerId: string;
    inventoryItemId: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    tenantId: string;
  }) {
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