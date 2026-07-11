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

  async confirmSalesOrder(id: string) {
    const salesOrder =
      await this.getSalesOrderById(id);
    if (
      salesOrder.status !== "PENDING"
    ) {
      throw new AppError(
        "Only pending orders can be confirmed",400
      );
    }
    return salesOrderRepository.updateSalesOrder(
      id,
      {
        status: "CONFIRMED"
      }
    );
  }

  async completeSalesOrder(id: string) {
    const salesOrder =
      await this.getSalesOrderById(id);
    if (
      salesOrder.status !== "CONFIRMED"
    ) {
      throw new AppError(
        "Only confirmed orders can be completed",400
      );
    }
    return salesOrderRepository.updateSalesOrder(
      id,
      {
        status: "COMPLETED"
      }
    );
  }

  async cancelSalesOrder(id: string) {
    const salesOrder =
      await this.getSalesOrderById(id);
    if (
      salesOrder.status === "COMPLETED"
    ) {
      throw new AppError(
        "Completed orders cannot be cancelled",400
      );
    }
    if (
      salesOrder.status === "CANCELLED"
    ) {
      throw new AppError(
        "Order is already cancelled",
        400
      );
    }
    return salesOrderRepository.updateSalesOrder(
      id,
      {
        status: "CANCELLED"
      }
    );
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
    if (inventoryItem.quantity < data.quantity) {
      throw new AppError("Insufficient stock",400);
    }
    const orderNumber = `SO-${Date.now()}`;
    const unitPrice = Number(inventoryItem.unitPrice);
    const totalAmount = unitPrice * data.quantity;
    const salesOrder = await salesOrderRepository.createSalesOrder({
        orderNumber,
        customerId: data.customerId,
        inventoryItemId: data.inventoryItemId,
        quantity: data.quantity,
        unitPrice,
        totalAmount,
        tenantId: data.tenantId,
    });
    await inventoryRepository.updateInventoryItem(
      inventoryItem.id,
      {
        quantity: inventoryItem.quantity - data.quantity,
      }
    );
    await notificationService.createNotification({
      title: "Sales Order Created",
      message: `Sales Order ${orderNumber} created successfully`,
      tenantId: data.tenantId,
    });
    return salesOrder;
  }

  async updateSalesOrder(id: string,data: UpdateSalesOrderDto) {
    const order = await this.getSalesOrderById(id);
    if (data.quantity !== undefined) {
      const inventoryItem = await inventoryRepository.getInventoryItemById(order.inventoryItemId);
      if (!inventoryItem) {
        throw new AppError("Inventory item not found",404);
      }
      const availableStock = inventoryItem.quantity + order.quantity;
      if (availableStock < data.quantity) {
        throw new AppError("Insufficient stock",400);
      }
      await inventoryRepository.updateInventoryItem(
        inventoryItem.id,
        {
          quantity: availableStock - data.quantity,
        }
      );
      const unitPrice = Number(order.unitPrice);
      return salesOrderRepository.updateSalesOrder(
        id,
        {
          quantity: data.quantity,
          status: data.status,
          totalAmount: unitPrice * data.quantity,
        }
      );
    }
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