import invoiceRepository from "../repositories/invoice.repository";
import salesOrderRepository from "../repositories/salesOrder.repository";
import notificationService from "./notification.service";
import AppError from "../utils/AppError";
import { CreateInvoiceDto, UpdateInvoiceDto, } from "../types/invoice.types";

class InvoiceService {

  async getAllInvoices() {
    return invoiceRepository.getAllInvoices();
  }

  async getInvoiceById(id: string) {
    const invoice = await invoiceRepository.getInvoiceById(id);
    if (!invoice) {
      throw new AppError("Invoice not found",404);
    }
    return invoice;
  }

  async createInvoice(data: CreateInvoiceDto) {
    const salesOrder = await salesOrderRepository.getSalesOrderById(data.salesOrderId);
    if (!salesOrder) {
      throw new AppError("Sales order not found",404);
    }
    const amount = Number(salesOrder.unitPrice) * salesOrder.quantity;
    const invoice = await invoiceRepository.createInvoice({
        invoiceNumber: `INV-${Date.now()}`,
        amount,
        dueDate: data.dueDate,
        salesOrderId: data.salesOrderId,
        tenantId: data.tenantId,
    });
    await notificationService.createNotification({
      title: "Invoice Created",
      message: invoice.invoiceNumber,
      tenantId: invoice.tenantId,
    });
    return invoice;
  }

  async updateInvoice(id: string,data: UpdateInvoiceDto) {
    await this.getInvoiceById(id);
    return invoiceRepository.updateInvoice(id,data);
  }

  async deleteInvoice(id: string) {
    await this.getInvoiceById(id);
    return invoiceRepository.deleteInvoice(id);
  }
}

export default new InvoiceService();