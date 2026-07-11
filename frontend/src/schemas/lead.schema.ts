import { z } from "zod";

export const leadSchema = z.object({
    title:z.string().min(2),
    status:z.enum([
        "NEW",
        "CONTACTED",
        "QUALIFIED",
        "LOST",
        "WON"
    ]),
    customerId:z.string()
});

export type LeadFormData = z.infer<typeof leadSchema>;