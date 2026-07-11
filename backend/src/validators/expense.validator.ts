import { z } from "zod";

export const createExpenseSchema = z.object({

    title: z.string().min(2),

    description: z.string().optional(),

    amount: z.number().positive(),

    expenseDate: z.coerce.date(),

    employeeId: z.string().min(1)

});

export const updateExpenseSchema =

    createExpenseSchema.partial();