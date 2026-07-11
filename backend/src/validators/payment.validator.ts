import { z } from "zod";

export const createPaymentSchema = z.object({

    paymentNumber: z.string().optional(),

    invoiceId: z.string(),

    amount: z.number().positive(),

    paymentDate: z.coerce.date(),

    status: z.enum([
        "PENDING",
        "COMPLETED",
        "FAILED"
    ]).optional(),

    tenantId: z.string().optional()

});