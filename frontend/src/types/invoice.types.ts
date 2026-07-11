export type InvoiceStatus =
    | "DRAFT"
    | "SENT"
    | "PAID"
    | "OVERDUE";

export interface Customer {

    id: string;

    name: string;

    email?: string;

}

export interface SalesOrder {

    id: string;

    salesOrderNumber: string;

    customer: Customer;

}

export interface Invoice {

    id: string;

    invoiceNumber: string;

    salesOrderId: string;

    salesOrder: SalesOrder;

    amount: number;

    dueDate: string;

    status: InvoiceStatus;

    paymentToken?: string;

    paymentSentAt?: string;

    paidAt?: string;

    createdAt: string;

    updatedAt: string;

}

export interface CreateInvoiceDto {

    salesOrderId: string;

    amount: number;

    dueDate: string;

}

export interface UpdateInvoiceDto {

    salesOrderId?: string;

    amount?: number;

    dueDate?: string;

}