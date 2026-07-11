import { z } from "zod";

export const grnSchema = z.object({
    grnNumber:z.string().min(1),
    quantityReceived:z.coerce.number(),
    remarks:z.string().optional(),
    status:z.enum([
        "PENDING",
        "RECEIVED",
        "REJECTED"
    ]),
    purchaseOrderId:z.string()
});

export type GRNFormData = z.infer<typeof grnSchema>;