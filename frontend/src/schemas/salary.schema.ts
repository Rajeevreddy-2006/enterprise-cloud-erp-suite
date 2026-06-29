import { z } from "zod";

export const salarySchema = z.object({
    employeeId: z.string().min(1,"Employee required"),
    basicSalary: z.number().min(0),
    hra: z.number().min(0),
    bonus: z.number().min(0),
    pfPercentage: z.number().min(0).max(100),
    taxPercentage: z.number().min(0).max(100)
});

export type SalaryFormData = z.infer<typeof salarySchema>;