import { z } from "zod";

export const createSalesOrderSchema = z.object({

    customerId: z.string(),

    inventoryItemId: z.string(),

    quantity: z.number().int().positive(),

    unitPrice: z.number().positive(),

    totalAmount: z.number().positive(),

    tenantId: z.string().optional()

});

export const updateSalesOrderSchema = z.object({
  quantity: z.number().int().positive().optional(),

  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "COMPLETED",
    "CANCELLED",
  ]).optional(),
});