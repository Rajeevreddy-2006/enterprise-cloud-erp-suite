import crypto from "crypto";

import invoiceRepository from "../repositories/invoice.repository";
import salesOrderRepository from "../repositories/salesOrder.repository";
import tenantRepository from "../repositories/tenant.repository";
import paymentRepository from "../repositories/payment.repository";

import notificationService from "./notification.service";

import { safeSendEmail } from "../utils/safeEmail";

import AppError from "../utils/AppError";

import {
    CreateInvoiceDto,
    UpdateInvoiceDto,
} from "../types/invoice.types";

class InvoiceService {

    async getAllInvoices(tenantId: string) {
        return invoiceRepository.getAllInvoices(
          tenantId
        );
    }

    async getInvoiceById(
        id: string,
        tenantId: string
    ) {
        const invoice =
            await invoiceRepository.getInvoiceById(
                id,
                tenantId
            );
        if (!invoice) {
            throw new AppError(
              "Invoice not found",404
            );
        }
        return invoice;
    }

    async createInvoice(data: CreateInvoiceDto) {
        const salesOrder =
            await salesOrderRepository.getSalesOrderById(
                data.salesOrderId
            );
        if (!salesOrder) {
            throw new AppError(
                "Sales Order not found",404
            );
        }
        const existingInvoice =
          await invoiceRepository.getInvoiceBySalesOrderId(
              data.salesOrderId
          );
        if (existingInvoice) {
          throw new AppError(
            "Invoice already exists for this Sales Order.",400
          );
        }
        const amount = Number(salesOrder.unitPrice) *salesOrder.quantity;
        const invoice =
            await invoiceRepository.createInvoice({
                invoiceNumber:
                    `INV-${Date.now()}`,
                salesOrderId:
                    data.salesOrderId,
                amount,
                dueDate:
                    data.dueDate,
                tenantId:
                    data.tenantId,
                status:
                    "DRAFT",
            });
        await notificationService.createNotification({
            title:
                "Invoice Created",
            message:
                `Invoice ${invoice.invoiceNumber} created.`,
            tenantId:
                invoice.tenantId,
        });
        return invoice;
    }

    async updateInvoice(
        id: string,
        tenantId: string,
        data: UpdateInvoiceDto
    ) {
        await this.getInvoiceById(
            id,
            tenantId
        );
        return invoiceRepository.updateInvoice(
            id,
            tenantId,
            data
        );
    }

    async deleteInvoice(
        id: string,
        tenantId: string
    ) {
        await this.getInvoiceById(
            id,
            tenantId
        );
        return invoiceRepository.deleteInvoice(
            id,
            tenantId
        );
    }
  // =====================================================
  // SEND INVOICE EMAIL
  // =====================================================

  async sendInvoice(
    id: string,
    tenantId: string
  ) {
    const invoice =
      await this.getInvoiceById(
        id,
        tenantId
      );
    if (invoice.status === "PAID") {
      throw new AppError("Invoice has already been paid",400);
    }
    const tenant =
      await tenantRepository.getTenantById(
        tenantId
      );
    if (!tenant) {
      throw new AppError("Tenant not found",404);
    }
    const customer = invoice.salesOrder.customer;
    if (!customer.email) {
      throw new AppError("Customer email not found",400);
    }
    const token = crypto.randomBytes(32).toString("hex");
    await invoiceRepository.sendInvoice(
      invoice.id,
      token
    );
    const paymentLink = `${process.env.FRONTEND_URL}/invoice/pay/${token}`;
    await safeSendEmail(
      customer.email,
      `Invoice ${invoice.invoiceNumber}`,
      `
          <div style="font-family:Arial,sans-serif">
              <h2>${tenant.name}</h2>
              <p>Hello ${customer.name},</p>
              <p>
                  Your invoice is ready.
              </p>
              <table
                  cellpadding="8"
                  cellspacing="0"
                  border="1"
                  style="border-collapse:collapse;"
              >
                  <tr>
                      <td>
                          <strong>
                              Invoice
                          </strong>
                      </td>
                      <td>
                          ${invoice.invoiceNumber}
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <strong>
                              Amount
                          </strong>
                      </td>
                      <td>
                          ₹${Number(invoice.amount).toLocaleString()}
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <strong>
                              Due Date
                          </strong>
                      </td>
                      <td>
                          ${invoice.dueDate.toDateString()}
                      </td>
                  </tr>
              </table>
              <br/>
              <a
                  href="${paymentLink}"
                  style="
                      background:#2563eb;
                      color:white;
                      padding:12px 20px;
                      text-decoration:none;
                      border-radius:6px;
                  "
              >
                  Pay Invoice
              </a>
              <br/><br/>
              <p>
                  This payment link expires on
                  <strong>
                      ${invoice.dueDate.toDateString()}
                  </strong>
              </p>
              <br/>
              <p>
                  Regards,
                  <br/>
                  ${tenant.name}
              </p>
          </div>
          `
    );
    await notificationService.createNotification({
      title:
        invoice.status === "DRAFT"
          ? "Invoice Sent"
          : "Invoice Resent",
      message:
        `Invoice ${invoice.invoiceNumber} emailed to ${customer.name}.`,
      tenantId,
    });
    return {
      message:
        invoice.status === "DRAFT"
          ? "Invoice sent successfully"
          : "Invoice resent successfully",
    };
  }
  // =====================================================
  // REVIEW INVOICE
  // =====================================================

  async reviewInvoice(
    token: string
  ) {
    const invoice =
      await invoiceRepository.reviewInvoice(
        token
      );
    if (!invoice) {
      throw new AppError(
        "Invalid payment link",404
      );
    }
    if (invoice.status === "PAID") {
      throw new AppError(
        "Invoice has already been paid",400
      );
    }
    if (invoice.dueDate < new Date()) {
      await invoiceRepository.expireInvoice(
        invoice.id
      );
      throw new AppError(
        "Invoice is overdue",400
      );
    }
    return invoice;
  }

  // =====================================================
  // PAY INVOICE
  // =====================================================

  async payInvoice(
    token: string
  ) {
    const invoice =
      await this.reviewInvoice(
        token
      );
    const updatedInvoice =
      await invoiceRepository.payInvoice(
        token
      );
    await paymentRepository.createPayment({
      paymentNumber: `PAY-${Date.now()}`,
      invoiceId: invoice.id,
      amount: Number(invoice.amount),
      tenantId: invoice.tenantId,
      paymentDate: new Date(),
      status: "COMPLETED",
    });
    await notificationService.createNotification({
      title:
        "Invoice Paid",
      message:
        `${updatedInvoice.salesOrder.customer.name} paid invoice ${updatedInvoice.invoiceNumber}.`,
      tenantId:
        updatedInvoice.tenantId,
    });
    return updatedInvoice;
  }

  // =====================================================
  // MARK OVERDUE
  // =====================================================

  async markInvoiceOverdue(
    id: string,
    tenantId: string
  ) {
    const invoice =
      await this.getInvoiceById(
        id,
        tenantId
      );
    if (invoice.status !== "SENT") {
      throw new AppError("Only sent invoices can become overdue",400);
    }
    if (invoice.dueDate > new Date()) {
      throw new AppError("Invoice is not overdue yet",400);
    }
    return invoiceRepository.expireInvoice(
      invoice.id
    );
  }

  //FAIL
  async failInvoice(token: string) {

    const invoice =
        await this.reviewInvoice(token);

    const updated =
        await invoiceRepository.failInvoice(token);

    await notificationService.createNotification({

        title: "Invoice Declined",

        message:
            `${invoice.salesOrder.customer.name} is not interested in paying invoice ${invoice.invoiceNumber}.`,

        tenantId: invoice.tenantId,

    });

    return updated;

  }
}

export default new InvoiceService();