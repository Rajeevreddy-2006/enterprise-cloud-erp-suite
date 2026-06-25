import { z } from "zod";

export const createLeaveSchema = z.object({
  employeeId: z.string().min(1),
  leaveType: z.enum([
    "SICK",
    "CASUAL",
    "EARNED",
    "UNPAID",
  ]),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  reason: z.string().optional(),
});

export const updateLeaveSchema =
  createLeaveSchema
    .partial()
    .extend({
      status: z.enum([
        "PENDING",
        "APPROVED",
        "REJECTED",
      ]).optional(),
    });