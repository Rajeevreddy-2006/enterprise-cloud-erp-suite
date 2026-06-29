import { z } from "zod";

export const createInteractionLogSchema = z.object({
  interactionType: z.enum([
    "CALL",
    "EMAIL",
    "MEETING",
    "FOLLOW_UP",
    "NOTE",
  ]),

  subject: z.string().min(2),

  notes: z.string().optional(),

  interactionDate: z.coerce.date().optional(),

  customerId: z.string(),

  leadId: z.string().optional(),

  opportunityId: z.string().optional(),

  employeeId: z.string().optional(),

  tenantId: z.string(),
});

export const updateInteractionLogSchema = z.object({
  interactionType: z.enum([
    "CALL",
    "EMAIL",
    "MEETING",
    "FOLLOW_UP",
    "NOTE",
  ]).optional(),

  subject: z.string().min(2).optional(),

  notes: z.string().optional(),

  interactionDate: z.coerce.date().optional(),
});