import { z } from "zod";

export const createJournalEntrySchema = z.object({

    amount: z.number().positive(),

    debitAccountId: z.string().min(1),

    creditAccountId: z.string().min(1),

    transactionId: z.string().min(1)

});

export const updateJournalEntrySchema =
    createJournalEntrySchema.partial();