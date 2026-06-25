import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2),
  type: z.enum([
    "ASSET",
    "LIABILITY",
    "EQUITY",
    "REVENUE",
    "EXPENSE",
  ]),
});

export const updateAccountSchema = createAccountSchema.partial();