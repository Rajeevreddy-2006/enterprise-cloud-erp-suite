import prisma from "../config/database";
import { CreateAttendanceDto, UpdateAttendanceDto, } from "../types/attendance.types";
import { RoleType } from "../generated/prisma/enums";

class AttendanceRepository {
  async getAllAttendances(tenantId: string,role: RoleType) {
    if (role === "TENANT_ADMIN") {
      return prisma.attendance.findMany({
        include: { employee: true, tenant: true, },
        orderBy: { date: "desc", },
      });
    }
    return prisma.attendance.findMany({
      where: { tenantId, },
      include: { employee: true, tenant: true, },
      orderBy: { date: "desc", },
    });
  }

  async getAttendanceByEmployee(employeeId: string) {
    return prisma.attendance.findMany({
      where: { employeeId },
      orderBy: { date: "desc" }
    });
  }

  async getAttendanceSummary(employeeId: string) {
    const attendance = await prisma.attendance.findMany({
      where: { employeeId }
    });
    const present =
      attendance.filter(
        a => a.status === "PRESENT"
      ).length;

    const absent =
      attendance.filter(
        a => a.status === "ABSENT"
      ).length;

    const leave =
      attendance.filter(
        a => a.status === "LEAVE"
      ).length;

    const halfDay =
      attendance.filter(
        a => a.status === "HALF_DAY"
      ).length;

    return {
      present,
      absent,
      leave,
      halfDay,
      paidDays:
        present +
        leave +
        halfDay * 0.5
    };
  }

  async getAttendanceById(id: string) {
    return prisma.attendance.findUnique({
      where: { id },
      include: { employee: true, tenant: true, },
    });
  }

  async getAttendanceByEmployeeDate(employeeId: string,date: Date) {
    return prisma.attendance.findFirst({
      where: { employeeId, date, },
    });
  }

  async createAttendance(data: CreateAttendanceDto) {
    return prisma.attendance.create({
      data,
      include: { employee: true, tenant: true, },
    });
  }

  async updateAttendance(id: string,data: UpdateAttendanceDto) {
    return prisma.attendance.update({
      where: { id },
      data,
      include: { employee: true, tenant: true, },
    });
  }

  async deleteAttendance(id: string) {
    return prisma.attendance.delete({
      where: { id },
    });
  }

  async getEmployeeById(employeeId: string) {
    return prisma.employee.findUnique({
      where: { id: employeeId, },
    });
  }
}

export default new AttendanceRepository();