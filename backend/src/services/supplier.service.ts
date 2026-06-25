import supplierRepository from "../repositories/supplier.repository";
import notificationService from "./notification.service";
import AppError from "../utils/AppError";
import { CreateSupplierDto, UpdateSupplierDto, } from "../types/supplier.types";

class SupplierService {

  async getAllSuppliers() {
    return supplierRepository.getAllSuppliers();
  }

  async getSupplierById(id: string) {
    const supplier = await supplierRepository.getSupplierById(id);
    if (!supplier) {
      throw new AppError("Supplier not found",404);
    }
    return supplier;
  }

  async getSupplierAnalytics(supplierId: string) {
    const supplier = await supplierRepository.getSupplierAnalytics(supplierId);
    if (!supplier) {
        throw new AppError("Supplier not found",404);
    }
    const totalOrders = supplier.purchaseOrders.length;
    let totalQuantity = 0;
    let totalSpend = 0;
    let pendingOrders = 0;
    let completedOrders = 0;
    for (const order of supplier.purchaseOrders) {
        totalQuantity += order.quantity;
        totalSpend += order.quantity * Number(order.unitPrice);
        if (order.status === "PENDING") {
            pendingOrders++;
        }
        if (order.status === "RECEIVED") {
            completedOrders++;
        }
    }
    return {
        supplier: supplier.name,
        totalOrders, 
        totalQuantity,
        totalSpend,
        pendingOrders,
        completedOrders,
    };
  }

  async createSupplier(data: CreateSupplierDto) {
    const supplier = await supplierRepository.createSupplier(data);
    await notificationService.createNotification({
      title: "Supplier Created",
      message: `${supplier.name} supplier created`,
      tenantId: supplier.tenantId,
    });
    return supplier;
  }

  async updateSupplier(id: string,data: UpdateSupplierDto) {
    await this.getSupplierById(id);
    return supplierRepository.updateSupplier(id,data);
  }

  async deleteSupplier(id: string) {
    await this.getSupplierById(id);
    return supplierRepository.deleteSupplier(id);
  }
}

export default new SupplierService();