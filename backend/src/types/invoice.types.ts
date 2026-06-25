import { InvoiceStatus } from "../generated/prisma/enums";

export interface CreateInvoiceDto {
  salesOrderId: string;
  dueDate: Date;
  tenantId: string;
}

export interface UpdateInvoiceDto {
  status?: InvoiceStatus;
}