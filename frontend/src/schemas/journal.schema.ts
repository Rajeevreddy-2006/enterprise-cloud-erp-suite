import { z } from "zod";

export const journalSchema = z.object({
    amount:z.number(),
    debitAccountId:z.string(),
    creditAccountId:z.string(),
    transactionId:z.string()
});

export type JournalFormData = z.infer<typeof journalSchema>;