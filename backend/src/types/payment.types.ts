import { PaymentStatus } from "../generated/prisma/enums";

export interface CreatePaymentDto {

    paymentNumber: string;

    invoiceId: string;

    amount: number;

    paymentDate: Date;

    tenantId: string;

    status?: PaymentStatus;

}

export interface UpdatePaymentDto {

    paymentDate?: Date;

    status?: PaymentStatus;

}