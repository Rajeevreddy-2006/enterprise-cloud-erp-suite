import { z } from "zod";

export const purchaseRequestSchema = z.object({
    title:z.string().min(2),
    description:z.string().optional(),
    quantity:z.coerce.number(),
    status:z.enum([
        "PENDING",
        "APPROVED",
        "REJECTED"
    ]),
    inventoryItemId:z.string()
});

export type PurchaseRequestFormData = z.infer<typeof purchaseRequestSchema>;