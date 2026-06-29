import { QuotationStatus } from "../generated/prisma/enums";

export interface CreateQuotationDto {
  quotationNumber: string;
  customerId: string;
  opportunityId?: string;
  amount: number;
  validUntil: Date;
  status?: QuotationStatus;
  tenantId: string;
}

export interface UpdateQuotationDto {
  quotationNumber?: string;
  customerId?: string;
  opportunityId?: string;
  amount?: number;
  validUntil?: Date;
  status?: QuotationStatus;
}