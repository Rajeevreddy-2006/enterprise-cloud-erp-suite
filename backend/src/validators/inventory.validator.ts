import { z } from "zod";

export const createInventorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  sku: z.string().min(2, "SKU must be at least 2 characters"),

  quantity: z.number().int().min(0),

  unitPrice: z.number().positive(),
});

export const updateInventorySchema = createInventorySchema.partial();