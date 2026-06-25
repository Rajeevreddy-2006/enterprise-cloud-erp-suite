import { z } from "zod";

export const createDocumentSchema = z.object({
    name: z.string().min(2),
    fileUrl: z.url(),
    category: z.enum([
      "EMPLOYEE",
      "PAYSLIP",
      "INVOICE",
      "PURCHASE_ORDER",
      "EXPENSE",
      "ASSET",
      "SUPPLIER",
      "CONTRACT",
      "OTHER",
    ]),
    tenantId: z.string(),
    uploadedById: z.string().optional(),
});