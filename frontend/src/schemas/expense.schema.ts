import { z } from "zod";

export const expenseSchema = z.object({
    title:z.string().min(2),
    description:z.string().optional(),
    amount:z.coerce.number(),
    expenseDate:z.string(),
    status:z.enum([
        "PENDING",
        "APPROVED",
        "REJECTED",
        "PAID"
    ]),
    employeeId:z.string()
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;