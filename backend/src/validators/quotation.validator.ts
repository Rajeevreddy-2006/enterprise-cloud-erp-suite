import { z } from "zod";

export const createQuotationSchema = z.object({
  quotationNumber: z.string().min(2),

  customerId: z.string(),

  opportunityId: z.string().optional(),

  amount: z.number().positive(),

  validUntil: z.coerce.date(),

  status: z.enum([
    "DRAFT",
    "SENT",
    "ACCEPTED",
    "REJECTED",
    "EXPIRED",
  ]).optional(),

  tenantId: z.string(),
});

export const updateQuotationSchema = z.object({
  quotationNumber: z.string().min(2).optional(),

  customerId: z.string().optional(),

  opportunityId: z.string().optional(),

  amount: z.number().positive().optional(),

  validUntil: z.coerce.date().optional(),

  status: z.enum([
    "DRAFT",
    "SENT",
    "ACCEPTED",
    "REJECTED",
    "EXPIRED",
  ]).optional(),
});