import { z } from "zod";

export const interactionSchema = z.object({
    interactionType:z.enum([
        "CALL",
        "EMAIL",
        "MEETING",
        "FOLLOW_UP",
        "NOTE"
    ]),
    subject:z.string().min(2),
    notes:z.string().optional(),
    interactionDate:z.string(),
    customerId:z.string(),
    leadId:z.string().optional(),
    opportunityId:z.string().optional(),
    employeeId:z.string().optional()
});

export type InteractionFormData = z.infer<typeof interactionSchema>;