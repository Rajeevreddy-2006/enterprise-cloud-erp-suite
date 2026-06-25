import { z } from "zod";

export const createTransactionSchema = z.object({
    description: z.string().min(2),
    amount: z.number().positive(),
    type: z.enum([
      "DEBIT",
      "CREDIT",
    ]),
    accountId: z.string().min(1),
  });

export const updateTransactionSchema = createTransactionSchema.partial();