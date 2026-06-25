import { AttendanceStatus } from "../generated/prisma/enums";

export interface CreateAttendanceDto {
  employeeId: string;
  tenantId: string;
  date: Date;
  status: AttendanceStatus;
  checkIn?: Date;
  checkOut?: Date;
}

export interface UpdateAttendanceDto {
  status?: AttendanceStatus;
  checkIn?: Date;
  checkOut?: Date;
}