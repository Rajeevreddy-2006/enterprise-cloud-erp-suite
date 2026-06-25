import { z } from "zod";

export const createSalaryStructureSchema = z.object({
  employeeId: z.string().min(1),
  basicSalary: z.number().positive(),
  hra: z.number().min(0).optional(),
  bonus: z.number().min(0).optional(),
  pfPercentage: z.number().min(0).max(100).optional(),
  taxPercentage: z.number().min(0).max(100).optional(),
});

export const updateSalaryStructureSchema = createSalaryStructureSchema.omit({ employeeId: true, }).partial();