import { z } from "zod";

export const purchaseSchema = z.object({
    orderNumber:z.string().min(1),
    quantity:z.coerce.number(),
    unitPrice:z.coerce.number(),
    status:z.enum([
        "PENDING",
        "APPROVED",
        "RECEIVED",
        "CANCELLED"
    ]),
    inventoryItemId:z.string(),
    supplierId:z.string().optional()
});

export type PurchaseFormData = z.infer<typeof purchaseSchema>;