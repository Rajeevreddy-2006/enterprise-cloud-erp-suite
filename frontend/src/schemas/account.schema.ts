import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(1),
  type: z.enum([
    "ASSET",
    "LIABILITY",
    "EQUITY",
    "REVENUE",
    "EXPENSE"
  ]),
  balance: z.coerce.number()
});

export type AccountFormData = z.output<typeof accountSchema>;
export type AccountFormInput = z.input<typeof accountSchema>;