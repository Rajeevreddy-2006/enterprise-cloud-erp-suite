import { z } from "zod";

export const createGRNSchema = z.object({
  purchaseOrderId: z.string(),
  quantityReceived: z.number().positive(),
  remarks: z.string().optional(),
  tenantId: z.string(),
});