import { z } from "zod";

export const createPayrollSchema = z.object({
  employeeId: z.string().min(1),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000),
});

export const updatePayrollSchema = z.object({
  status: z.enum(["PENDING","PROCESSED","PAID",]),
});