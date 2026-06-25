import salesOrderRepository from "../repositories/salesOrder.repository";
import customerRepository from "../repositories/customer.repository";
import inventoryRepository from "../repositories/inventory.repository";
import notificationService from "./notification.service";
import AppError from "../utils/AppError";
import { CreateSalesOrderDto, UpdateSalesOrderDto, } from "../types/salesOrder.types";

class SalesOrderService {
  async getAllSalesOrders() {
    return salesOrderRepository.getAllSalesOrders();
  }

  async getSalesOrderById(id: string) {
    const order = await salesOrderRepository.getSalesOrderById(id);
    if (!order) {
      throw new AppError("Sales order not found",404);
    }
    return order;
  }

  async createSalesOrder(data: CreateSalesOrderDto) {
    const customer = await customerRepository.getCustomerById(data.customerId);
    if (!customer) {
      throw new AppError("Customer not found",404);
    }
    const inventoryItem = await inventoryRepository.getInventoryItemById(data.inventoryItemId);
    if (!inventoryItem) {
      throw new AppError("Inventory item not found",404);
    }
    if (inventoryItem.quantity <data.quantity) {
      throw new AppError("Insufficient stock",400);
    }
    const salesOrder = await salesOrderRepository.createSalesOrder({
        orderNumber: `SO-${Date.now()}`,
        quantity: data.quantity,
        unitPrice: inventoryItem.unitPrice,
        customerId: data.customerId,
        inventoryItemId: data.inventoryItemId,
        tenantId: data.tenantId,
    });
    await inventoryRepository.updateInventoryItem(
      inventoryItem.id,
      {
        quantity:inventoryItem.quantity - data.quantity,
      }
    );
    await notificationService.createNotification({
      title: "Sales Order Created",
      message: salesOrder.orderNumber,
      tenantId: salesOrder.tenantId,
    });
    return salesOrder;
  }

  async updateSalesOrder(id: string,data: UpdateSalesOrderDto) {
    await this.getSalesOrderById(id);
    return salesOrderRepository.updateSalesOrder(id,data);
  }

  async deleteSalesOrder(id: string) {
    const order = await this.getSalesOrderById(id);
    await inventoryRepository.updateInventoryItem(
      order.inventoryItemId,
      {
        quantity: order.inventoryItem.quantity + order.quantity,
      }
    );
    return salesOrderRepository.deleteSalesOrder(id);
  }
}

export default new SalesOrderService();