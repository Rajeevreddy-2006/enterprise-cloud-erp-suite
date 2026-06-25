import prisma from "../config/database";
import { CreatePayrollDto, PayrollCreateData, UpdatePayrollDto, } from "../types/payroll.types";
import { RoleType } from "../generated/prisma/enums";

class PayrollRepository {

  async getAllPayrolls(tenantId: string,role: RoleType) {
    if (role === "SUPER_ADMIN") {
      return prisma.payroll.findMany({
        include: { employee: true, tenant: true, },
        orderBy: { createdAt: "desc", },
      });
    }
    return prisma.payroll.findMany({
      where: { tenantId, },
      include: { employee: true, tenant: true, },
      orderBy: { createdAt: "desc", },
    });
  }

  async getAttendancesForMonth(employeeId: string,month: number,year: number) {
    return prisma.attendance.findMany({
        where: {
            employeeId,
            date: { gte: new Date(year, month - 1, 1), lt: new Date(year, month, 1), },
        },
    });
  }

  async getApprovedLeavesForMonth(employeeId: string,month: number,year: number) {
    return prisma.leave.findMany({
        where: {
            employeeId,
            status: "APPROVED",
            startDate: { lt: new Date(year, month, 1), },
            endDate: { gte: new Date(year, month - 1, 1), },
        },
    });
  }

  async getAccountByName(tenantId: string,name: string) {
    return prisma.account.findFirst({
        where: { tenantId, name, },
    });
  }

  async getPayrollById(id: string) {
    return prisma.payroll.findUnique({
      where: { id },
      include: { employee: true, tenant: true, },
    });
  }

  async getPayrollByEmployeeMonth(employeeId: string,month: number,year: number) {
    return prisma.payroll.findFirst({
      where: { employeeId, month, year, },
    });
  }

  async getEmployeeById(employeeId: string) {
    return prisma.employee.findUnique({
      where: { id: employeeId, },
    });
  }

  async getSalaryStructureByEmployeeId(employeeId: string) {
    return prisma.salaryStructure.findUnique({
      where: { employeeId, },
    });
  }

  async getPayrollWithDetails(id: string) {
    return prisma.payroll.findUnique({
        where: { id },
        include: { employee: true, tenant: true, },
    });
  }

  async createPayroll(data: PayrollCreateData) {
    return prisma.payroll.create({
      data,
      include: { employee: true, tenant: true, },
    });
  }

  async updatePayroll(id: string,data: UpdatePayrollDto) {
    return prisma.payroll.update({
      where: { id },
      data,
      include: { employee: true, tenant: true, },
    });
  }

  async deletePayroll(id: string) {
    return prisma.payroll.delete({
      where: { id, },
    });
  }
}

export default new PayrollRepository();