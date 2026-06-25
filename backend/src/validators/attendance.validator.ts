import { z } from "zod";

export const createAttendanceSchema = z.object({
  employeeId: z.string().min(1),
  date: z.coerce.date(),
  status: z.enum([
    "PRESENT",
    "ABSENT",
    "HALF_DAY",
    "LEAVE",
  ]),
  checkIn: z.coerce.date().optional(),
  checkOut: z.coerce.date().optional(),
});

export const updateAttendanceSchema =
  createAttendanceSchema
    .omit({employeeId: true,date: true,})
    .partial();