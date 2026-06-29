import { z } from "zod";
import { LeaveType, LeaveStatus } from "@/types/leave.types";

export const leaveSchema = z.object({
    employeeId: z.string().min(1,"Employee required"),
    leaveType: z.enum(LeaveType),
    startDate: z.string(),
    endDate: z.string(),
    reason: z.string().optional(),
    status: z.enum(LeaveStatus).optional()
});

export type LeaveFormData = z.infer<typeof leaveSchema>;