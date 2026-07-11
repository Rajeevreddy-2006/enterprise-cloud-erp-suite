import attendanceRepository from "../repositories/attendance.repository";
import { CreateAttendanceDto, UpdateAttendanceDto, } from "../types/attendance.types";
import { RoleType } from "../generated/prisma/enums";
import AppError from "../utils/AppError";
import { AttendanceSummary } from "../types/attendance.types";

class AttendanceService {

  async getAllAttendances(tenantId: string,role: RoleType) {
    return attendanceRepository.getAllAttendances(tenantId,role);
  }

  async employeeAttendance(employeeId: string) {
    return attendanceRepository
      .getAttendanceByEmployee(
        employeeId
      );
  }

  async employeeAttendanceSummary(employeeId: string) {
    return attendanceRepository
      .getAttendanceSummary(
        employeeId
      );
  }

  async getAttendanceById(id: string) {
    return attendanceRepository.getAttendanceById(id);
  }

  async createAttendance(data: CreateAttendanceDto) {
    const employee = await attendanceRepository.getEmployeeById(data.employeeId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    const attendanceDate = new Date(data.date);
    const existing =
      await attendanceRepository.getAttendanceByEmployeeDate(
        data.employeeId,
        attendanceDate
      );
    if (existing) {
      throw new AppError("Attendance already marked for this date",400);
    }
    return attendanceRepository.createAttendance({
      ...data,
      date: attendanceDate
    });
  }

  async updateAttendance(id: string,data: UpdateAttendanceDto) {
    const attendance = await attendanceRepository.getAttendanceById(id);
    if (!attendance) {
      throw new AppError("Attendance not found",404);
    }
    return attendanceRepository.updateAttendance(id,data);
  }

  async deleteAttendance(id: string) {
    const attendance = await attendanceRepository.getAttendanceById(id);
    if (!attendance) {
      throw new AppError("Attendance not found",404);
    }
    return attendanceRepository.deleteAttendance(id);
  }
}

export default new AttendanceService();