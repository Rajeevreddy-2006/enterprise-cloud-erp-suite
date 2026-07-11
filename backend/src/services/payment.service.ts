import paymentRepository from "../repositories/payment.repository";
import invoiceRepository from "../repositories/invoice.repository";
import notificationService from "./notification.service";
import AppError from "../utils/AppError";
import { CreatePaymentDto, UpdatePaymentDto, } from "../types/payment.types";
import workflowService from "./workflow.service";

class PaymentService {

  async getAllPayments() {
    return paymentRepository.getAllPayments();
  }

  async getPaymentById(id: string) {
    const payment = await paymentRepository.getPaymentById(id);
    if (!payment) {
      throw new AppError("Payment not found",404);
    }
    return payment;
  }

  async completePayment(id: string) {
    const payment =
      await this.getPaymentById(id);
    if (payment.status !== "PENDING") {
      throw new AppError(
        "Only pending payments can be completed",400
      );
    }
    const updatedPayment =
      await paymentRepository.updatePayment(
        id,
        {
          status: "COMPLETED"
        }
      );
    // Update Invoice Status
    await invoiceRepository.updateInvoice(
      payment.invoiceId,
      payment.tenantId,
      {
        status: "PAID"
      }
    );
    return updatedPayment;
  }

  async failPayment(id: string) {
    const payment =
      await this.getPaymentById(id);
    if (payment.status !== "PENDING") {
      throw new AppError(
        "Only pending payments can be failed",400
      );
    }
    return paymentRepository.updatePayment(
      id,
      {
        status: "FAILED"
      }
    );
  }

  async createPayment(data: CreatePaymentDto) {
    const invoice =
    await invoiceRepository.getInvoiceById(
        data.invoiceId,
        data.tenantId
    );
    if (!invoice) {
      throw new AppError("Invoice not found",404);
    }
    if (data.amount > Number(invoice.amount)) {
      throw new AppError("Payment exceeds invoice amount",400);
    }
    const payment = await paymentRepository.createPayment({
        paymentNumber: `PAY-${Date.now()}`,
        amount: data.amount,
        paymentDate: data.paymentDate,
        invoiceId: data.invoiceId,
        tenantId: data.tenantId,
    });
    await notificationService.createNotification({
      title: "Payment Created",
      message: payment.paymentNumber,
      tenantId: payment.tenantId,
    });
    return payment;
  }

  async updatePayment(id: string,data: UpdatePaymentDto) {
    const payment = await this.getPaymentById(id);
    const updatedPayment = await paymentRepository.updatePayment(id,data);
    if (payment.status !== "COMPLETED" && data.status === "COMPLETED") {
        const invoice =
        await invoiceRepository.getInvoiceById(
            payment.invoiceId,
            payment.tenantId
        );
        if (invoice) {
          await invoiceRepository.updateInvoice(
            invoice.id,
            invoice.tenantId,
            {
              status: "PAID",
            }
          );
          await workflowService.onInvoicePaid(invoice.invoiceNumber,invoice.tenantId);
        }
    }
    return updatedPayment;
  }

  async deletePayment(id: string) {
    await this.getPaymentById(id);
    return paymentRepository.deletePayment(id);
  }
}

export default new PaymentService();