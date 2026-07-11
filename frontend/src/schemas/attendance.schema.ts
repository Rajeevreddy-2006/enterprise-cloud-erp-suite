import { z } from "zod";
import { AttendanceStatus } from "@/types/attendance.types";

export const attendanceSchema = z.object({
    employeeId: z.string(),
    date: z.string().min(1,"Date is required"),
    status: z.enum(AttendanceStatus)
});

export type AttendanceFormData = z.infer<typeof attendanceSchema>;