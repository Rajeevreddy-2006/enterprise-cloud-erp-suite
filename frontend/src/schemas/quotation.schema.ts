import { z } from "zod";

export const quotationSchema = z.object({

    customerId:
        z.string().min(
            1,
            "Customer is required"
        ),

    amount:
        z.coerce
            .number()
            .positive(
                "Amount must be greater than 0"
            ),

    validUntil:
        z.string().min(
            1,
            "Valid Until is required"
        ),

});

export const acceptQuotationSchema = z.object({

    requestedQuantity:
        z.coerce
            .number()
            .int(
                "Quantity must be an integer"
            )
            .min(
                1,
                "Quantity must be at least 1"
            ),

});

export type QuotationFormData =
    z.input<typeof quotationSchema>;

export type QuotationFormOutput =
    z.output<typeof quotationSchema>;

export type AcceptQuotationFormData =
    z.input<typeof acceptQuotationSchema>;

export type AcceptQuotationFormOutput =
    z.output<typeof acceptQuotationSchema>;