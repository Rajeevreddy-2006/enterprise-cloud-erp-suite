import { LeaveStatus,LeaveType, } from "../generated/prisma/enums";

export interface CreateLeaveDto {
  employeeId: string;
  tenantId: string;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  reason?: string;
}

export interface UpdateLeaveDto {
  leaveType?: LeaveType;
  startDate?: Date;
  endDate?: Date;
  reason?: string;
  status?: LeaveStatus;
}