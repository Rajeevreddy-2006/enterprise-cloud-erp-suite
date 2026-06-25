import { z } from "zod";

export const createSalesOrderSchema = z.object({
    customerId: z.string(),
    inventoryItemId: z.string(),
    quantity: z.number().positive(),
    tenantId: z.string(),
});