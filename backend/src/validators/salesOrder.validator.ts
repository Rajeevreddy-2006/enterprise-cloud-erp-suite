import { z } from "zod";

export const createSalesOrderSchema = z.object({
  customerId: z.string(),

  inventoryItemId: z.string(),

  quantity: z.number().int().positive(),

  tenantId: z.string(),
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