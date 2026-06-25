import { z } from "zod";

export const createInvoiceSchema = z.object({
    salesOrderId: z.string(),
    dueDate: z.coerce.date(),
    tenantId: z.string(),
});