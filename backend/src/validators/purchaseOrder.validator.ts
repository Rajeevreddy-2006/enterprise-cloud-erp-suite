import { z } from "zod";

export const createPurchaseOrderSchema = z.object({
    quantity: z.number().positive(),
    unitPrice: z.number().positive(),
    inventoryItemId: z.string(),
    supplierId: z.string().optional(),
});

export const updatePurchaseOrderSchema = z.object({
    quantity: z.number().int().positive().optional(),
    unitPrice: z.number().positive().optional(),
    status: z.enum([
      "PENDING",
      "APPROVED",
      "RECEIVED",
      "CANCELLED",
    ]).optional(),
});