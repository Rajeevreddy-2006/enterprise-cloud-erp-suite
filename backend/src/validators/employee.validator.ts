import { z } from "zod";

export const createEmployeeSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  userId: z.string().optional(),
  departmentId: z.string().min(1),
  tenantId: z.string().optional(),
});

export const updateEmployeeSchema =
  createEmployeeSchema
    .partial()
    .omit({ tenantId: true, });