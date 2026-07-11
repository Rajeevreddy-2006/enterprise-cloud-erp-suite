import { z } from "zod";

export const paymentSchema = z.object({
    paymentNumber:z.string().min(1),
    amount:z.coerce.number(),
    paymentDate:z.string(),
    status:z.enum([
        "PENDING",
        "COMPLETED",
        "FAILED"
    ]),
    invoiceId:z.string()
});

export type PaymentFormData = z.infer<typeof paymentSchema>;