import { z } from "zod";

export const createQuotationSchema = z.object({
    customerId: z.string().min(1, "Customer is required"),

    opportunityId: z.string().optional(),

    amount: z
        .coerce
        .number()
        .positive("Amount must be greater than 0"),

    validUntil: z.coerce.date(),
});

export const updateQuotationSchema = z.object({
    customerId: z.string().optional(),

    opportunityId: z.string().optional(),

    amount: z
        .coerce
        .number()
        .positive("Amount must be greater than 0")
        .optional(),

    validUntil: z.coerce.date().optional(),
});

export const sendQuotationSchema = z.object({
    quotationId: z.string().cuid(),
});

export const quotationTokenSchema = z.object({
    token: z.string().min(10),
});

export const acceptQuotationSchema = z.object({
    requestedQuantity: z
        .coerce
        .number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1"),
});

export const rejectQuotationSchema = z.object({});