import { QuotationStatus } from "../generated/prisma/enums";

export interface CreateQuotationDto {
    quotationNumber: string;
    customerId: string;
    opportunityId?: string;
    amount: number; // Per Unit Price
    validUntil: Date;
    tenantId: string;
}

export interface UpdateQuotationDto {
    customerId?: string;
    opportunityId?: string;
    amount?: number;
    validUntil?: Date;
}

export interface SendQuotationDto {
    quotationId: string;
}

export interface ReviewQuotationDto {
    token: string;
}

export interface AcceptQuotationDto {
    token: string;
    requestedQuantity: number;
}

export interface RejectQuotationDto {
    token: string;
}

export interface UpdateQuotationStatusDto {
    status: QuotationStatus;
}

export interface ReviewQuotationResponseDto {
    quotationNumber: string;
    customerName: string;
    amount: number;
    validUntil: Date;
    status: QuotationStatus;
    requestedQuantity?: number | null;
}