import { z } from "zod";

export const departmentSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional()
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;