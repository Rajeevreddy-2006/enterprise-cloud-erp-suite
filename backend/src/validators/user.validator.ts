import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  tenantId: z.string(),
  role: z.enum([
    "SUPER_ADMIN",
    "TENANT_ADMIN",
    "HR",
    "ACCOUNTANT",
    "EMPLOYEE",
  ]),
});

export const updateUserSchema =
  createUserSchema.partial().extend({
    isActive: z.boolean().optional(),
  });