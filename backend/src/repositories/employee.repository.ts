import prisma from "../config/database";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../types/employee.types";
import { RoleType } from "../generated/prisma/enums";


class EmployeeRepository {

  async getAllEmployees(tenantId: string,role: RoleType) {
    if (role === "SUPER_ADMIN") {
      return prisma.employee.findMany({
        include: { department: true, tenant: true, },
      });
    }
    return prisma.employee.findMany({
      where: { tenantId, },
      include: { department: true, tenant: true, },
    });
  }

  async getEmployeeByUserId(userId: string) {
    return prisma.employee.findUnique({
        where: { userId, },
        include: { department: true, tenant: true, salaryStructure: true, payrolls: true, attendances: true, leaves: true, },
    });
  }

  async createEmployee(data: CreateEmployeeDto) {
    return prisma.employee.create({
        data,
        include: { department: true, tenant: true, user: true, },
    });
  }

  async getEmployeeById(id: string) {
    return prisma.employee.findUnique({
        where: { id },
        include: { department: true, tenant: true, },
    });
  }

  async updateEmployee(id: string, data: UpdateEmployeeDto) {
    return prisma.employee.update({
        where: { id },
        data,
        include: { department: true, tenant: true, },
    });
  }

  async deleteEmployee(id: string) {
    return prisma.employee.delete({
        where: { id },
    });
  }
}

export default new EmployeeRepository();