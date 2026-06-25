import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    projectId: z.string(),
    assignedToId: z.string().optional(),
});

export const updateTaskSchema = z.object({
    title: z.string().min(2).optional(),
    description: z.string().optional(),
    assignedToId: z.string().optional(),
    status: z.enum([
        "TODO",
        "IN_PROGRESS",
        "DONE",
    ]).optional(),
});
