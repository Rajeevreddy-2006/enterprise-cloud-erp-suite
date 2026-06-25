import { z } from "zod";

export const createPaymentSchema = z.object({
    invoiceId: z.string(),
    amount: z.number().positive(),
    paymentDate: z.coerce.date(),
    tenantId: z.string(),
});