import { z } from "zod";

export const transactionSchema = z.object({
    description:z.string().min(2),
    amount:z.number(),
    type:z.enum([
        "CREDIT",
        "DEBIT"
    ]),
    accountId:z.string()
});

export type TransactionFormData = z.infer<typeof transactionSchema>;