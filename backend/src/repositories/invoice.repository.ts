import prisma from "../config/database";
import { CreateInvoiceDto, UpdateInvoiceDto, } from "../types/invoice.types";

class InvoiceRepository {

  async getAllInvoices() {
    return prisma.invoice.findMany({
      include: { salesOrder: true, tenant: true, },
    });
  }

  async getInvoiceById(id: string) {
    return prisma.invoice.findUnique({
      where: { id },
      include: { salesOrder: true, tenant: true, },
    });
  }

  async createInvoice(data: any) {
    return prisma.invoice.create({ data, });
  }

  async updateInvoice(id: string,data: UpdateInvoiceDto) {
    return prisma.invoice.update({
      where: { id },
      data,
    });
  }

  async deleteInvoice(id: string) {
    return prisma.invoice.delete({
      where: { id },
    });
  }
}

export default new InvoiceRepository();