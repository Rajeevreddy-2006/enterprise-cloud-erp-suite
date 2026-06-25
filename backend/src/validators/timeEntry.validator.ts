import { z } from "zod";

export const createTimeEntrySchema =
  z.object({
    date: z.coerce.date(),
    hours: z.number()
      .positive()
      .max(24),

    description:
      z.string().optional(),

    employeeId:
      z.string(),

    projectId:
      z.string(),

    taskId:
      z.string().optional(),
  });

export const updateTimeEntrySchema =
  z.object({
    date:
      z.coerce.date().optional(),

    hours:
      z.number()
        .positive()
        .max(24)
        .optional(),

    description:
      z.string().optional(),
  });