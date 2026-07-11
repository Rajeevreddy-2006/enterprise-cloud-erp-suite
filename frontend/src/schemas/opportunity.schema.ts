import { z } from "zod";

export const opportunitySchema = z.object({
    title:z.string().min(2),
    value:z.coerce.number(),
    status:z.enum([
        "OPEN",
        "WON",
        "LOST"
    ]),
    customerId:z.string()
});

export type OpportunityFormData = z.infer<typeof opportunitySchema>;