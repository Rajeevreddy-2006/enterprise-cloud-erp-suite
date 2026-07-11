import { InvoiceStatus } from "../generated/prisma/enums";

export interface CreateInvoiceDto {

    invoiceNumber: string;

    salesOrderId: string;

    amount: number;

    dueDate: string;

    tenantId: string;

    status?: InvoiceStatus;

}

export interface UpdateInvoiceDto {

    dueDate?: string;

    status?: InvoiceStatus;

}

/* =======================================================
   Invoice Payment Flow
======================================================= */

export interface SendInvoiceDto {

    invoiceId: string;

}

export interface ReviewInvoiceDto {

    token: string;

}

export interface PayInvoiceDto {

    token: string;

}

export interface UpdateInvoiceStatusDto {

    status: InvoiceStatus;

}