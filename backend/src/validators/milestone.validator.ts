import { z } from "zod";

export const createMilestoneSchema =
  z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    dueDate: z.coerce.date().optional(),
    projectId: z.string(),
  });

export const updateMilestoneSchema =
  z.object({
    title: z.string().min(2).optional(),
    description: z.string().optional(),
    dueDate: z.coerce.date().optional(),
    status: z.enum([
      "PENDING",
      "IN_PROGRESS",
      "COMPLETED",
    ]).optional(),
  });