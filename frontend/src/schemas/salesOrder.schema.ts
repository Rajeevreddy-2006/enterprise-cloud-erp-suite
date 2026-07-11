import { z } from "zod";

export const salesOrderSchema = z.object({
    orderNumber:z.string().min(1),
    quantity:z.coerce.number(),
    unitPrice:z.coerce.number(),
    totalAmount:z.coerce.number(),
    status:z.enum([
        "PENDING",
        "CONFIRMED",
        "COMPLETED",
        "CANCELLED"
    ]),
    customerId:z.string(),
    inventoryItemId:z.string()
});

export type SalesOrderFormData = z.infer<typeof salesOrderSchema>;