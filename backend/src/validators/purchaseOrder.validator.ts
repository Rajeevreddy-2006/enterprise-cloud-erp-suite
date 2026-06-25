import { z } from "zod";

export const createPurchaseOrderSchema = z.object({
    orderNumber: z.string().min(2),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
    inventoryItemId: z.string().min(1),
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