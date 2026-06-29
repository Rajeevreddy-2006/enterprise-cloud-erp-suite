import * as z from "zod";

export const employeeSchema = z.object({
    firstName:z.string().min(2),
    lastName:z.string().min(2),
    email:z.email(),
    phone:z.string().min(10),
    designation:z.string(),
    departmentId:z.string()
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;