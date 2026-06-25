import prisma from "../config/database";
import { CreateSupplierDto, UpdateSupplierDto, } from "../types/supplier.types";

class SupplierRepository {

  async getAllSuppliers() {
    return prisma.supplier.findMany({
      include: { purchaseOrders: true, },
    });
  }

  async getSupplierById(id: string) {
    return prisma.supplier.findUnique({
      where: { id },
      include: { purchaseOrders: true, },
    });
  }

  async getSupplierAnalytics(supplierId: string) {
    const supplier =await prisma.supplier.findUnique({
        where: { id: supplierId, },
        include: { purchaseOrders: true, },
    });
    return supplier;
  }

  async createSupplier(data: CreateSupplierDto) {
    return prisma.supplier.create({data,});
  }

  async updateSupplier(id: string,data: UpdateSupplierDto) {
    return prisma.supplier.update({
      where: { id },
      data,
    });
  }

  async deleteSupplier(id: string) {
    return prisma.supplier.delete({
      where: { id },
    });
  }
}

export default new SupplierRepository();