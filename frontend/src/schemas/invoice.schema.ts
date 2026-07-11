import { z } from "zod";

export const invoiceSchema = z.object({

    salesOrderId:
        z.string().min(1),

    amount:
        z.coerce
            .number()
            .positive(),

    dueDate:
        z.string()

});

export type InvoiceFormData =
    z.input<typeof invoiceSchema>;

export type InvoiceFormOutput =
    z.output<typeof invoiceSchema>;