import { z } from "zod";

export const createInvoiceSchema = z.object({

    invoiceNumber: z.string().optional(),

    salesOrderId: z.string().min(1, "Sales Order is required"),

    amount: z
        .number()
        .positive("Amount must be greater than 0"),

    dueDate: z.string(),

    status: z
        .enum([
            "DRAFT",
            "SENT",
            "PAID",
            "FAILED",
            "OVERDUE",
        ])
        .optional(),

    tenantId: z.string().optional(),

});

export const updateInvoiceSchema = z.object({

    dueDate: z.string().optional(),

    status: z
        .enum([
            "DRAFT",
            "SENT",
            "PAID",
            "FAILED",
            "OVERDUE",
        ])
        .optional(),

});

export const sendInvoiceSchema = z.object({

    invoiceId: z.string().cuid(),

});

export const invoiceTokenSchema = z.object({

    token: z.string().min(10),

});