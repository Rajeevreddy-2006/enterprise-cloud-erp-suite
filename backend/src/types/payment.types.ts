import { PaymentStatus } from "../generated/prisma/enums";

export interface CreatePaymentDto {
  invoiceId: string;
  amount: number;
  paymentDate: Date;
  tenantId: string;
}

export interface UpdatePaymentDto {
  status?: PaymentStatus;
}