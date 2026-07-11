import { z } from "zod";

export const tenantSchema = z.object({
    name:z.string().min(2),
    slug:z.string().min(2),
    isActive:z.boolean()
});

export type TenantFormData = z.infer<typeof tenantSchema>;