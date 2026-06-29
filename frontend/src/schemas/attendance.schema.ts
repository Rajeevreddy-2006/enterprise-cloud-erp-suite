import { z } from "zod";
import { AttendanceStatus } from "@/types/attendance.types";

export const attendanceSchema = z.object({
    employeeId: z.string().min(1,"Employee required"),
    date: z.string(),
    status: z.enum(AttendanceStatus),
    checkIn: z.string().optional(),
    checkOut: z.string().optional()
});

export type AttendanceFormData = z.infer<typeof attendanceSchema>;