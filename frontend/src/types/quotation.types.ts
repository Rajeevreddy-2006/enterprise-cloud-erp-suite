export type QuotationStatus =
    | "DRAFT"
    | "SENT"
    | "ACCEPTED"
    | "REJECTED"
    | "EXPIRED";

export interface Customer {

    id: string;

    name: string;

    email?: string;

}

export interface Opportunity {

    id: string;

    title: string;

}

export interface Quotation {

    id: string;

    quotationNumber: string;

    amount: number; // Price Per Unit

    requestedQuantity?: number;

    status: QuotationStatus;

    validUntil: string;

    customerId: string;

    approvalToken?: string;

    approvedAt?: string;

    rejectedAt?: string;

    sentAt?: string;

    customer: Customer;

    opportunity?: Opportunity;

    createdAt: string;

    updatedAt: string;

}

export interface CreateQuotation {

    customerId: string;

    amount: number;

    validUntil: string;

}

export interface UpdateQuotation {

    customerId?: string;

    amount?: number;

    validUntil?: string;

}

export interface AcceptQuotation {

    requestedQuantity: number;

}