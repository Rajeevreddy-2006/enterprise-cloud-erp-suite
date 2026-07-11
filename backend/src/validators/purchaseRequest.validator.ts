import { z } from "zod";

export const createPurchaseRequestSchema = z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    quantity: z.number().positive(),
    inventoryItemId: z.string(),
});