import { z } from "zod";

export const createOpportunitySchema = z.object({
  title: z.string().min(2),
  value: z.number().positive(),
  customerId: z.string(),
  tenantId: z.string(),
});