import { z } from "zod"

export const createDepartmentSchema = z.object({
    name: z.string().min(2),
    tenantId: z.string(),
});