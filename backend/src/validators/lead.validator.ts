import { z } from "zod";

export const createLeadSchema = z.object({
  title: z.string().min(2),
  customerId: z.string(),
  tenantId: z.string(),
});