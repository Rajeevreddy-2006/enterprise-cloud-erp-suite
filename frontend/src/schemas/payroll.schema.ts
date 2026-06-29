import { z } from "zod";
import { PayrollStatus }  from "@/types/payroll.types";

export const payrollSchema=
z.object({
    employeeId: z.string().min(1,"Employee required"),
    month: z.number().min(1).max(12),
    year: z.number().min(2024),
    grossSalary: z.number(),
    deductions: z.number(),
    netSalary: z.number(),
    status: z.enum(PayrollStatus).optional()
});

export type PayrollFormData = z.infer<typeof payrollSchema>;