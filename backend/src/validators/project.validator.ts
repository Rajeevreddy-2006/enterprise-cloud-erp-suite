import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    tenantId: z.string(),
});

export const updateProjectSchema = z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: z.enum([
        "PLANNING",
        "IN_PROGRESS",
        "ON_HOLD",
        "COMPLETED",
        "CANCELLED",
    ]).optional(),
});
