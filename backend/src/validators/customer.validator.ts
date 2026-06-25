import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(2),
  email: z.email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  tenantId: z.string(),
});