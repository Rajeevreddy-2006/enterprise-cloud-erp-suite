import prisma from "../config/database";
import { CreateSalaryStructureDto, UpdateSalaryStructureDto, } from "../types/salaryStructure.types";
import { RoleType } from "../generated/prisma/enums";

class SalaryStructureRepository {

  async getAllSalaryStructures(tenantId: string,role: RoleType) {
    if (role === "SUPER_ADMIN") {
      return prisma.salaryStructure.findMany({
        include: { employee: true, tenant: true, },
      });
    }
    return prisma.salaryStructure.findMany({
      where: { tenantId, },
      include: { employee: true, tenant: true, },
    });
  }

  async getSalaryStructureById(id: string) {
    return prisma.salaryStructure.findUnique({
      where: { id },
      include: { employee: true, tenant: true, },
    });
  }

  async getSalaryStructureByEmployeeId(employeeId: string) {
    return prisma.salaryStructure.findUnique({
      where: { employeeId, },
    });
  }

  async createSalaryStructure(data: CreateSalaryStructureDto) {
    return prisma.salaryStructure.create({
      data,
      include: { employee: true, tenant: true, },
    });
  }

  async updateSalaryStructure(id: string,data: UpdateSalaryStructureDto) {
    return prisma.salaryStructure.update({
      where: { id },
      data,
      include: { employee: true, tenant: true, },
    });
  }

  async deleteSalaryStructure(id: string) {
    return prisma.salaryStructure.delete({
      where: { id },
    });
  }

  async getEmployeeById(employeeId: string) {
    return prisma.employee.findUnique({
      where: { id: employeeId, },
    });
  }

}

export default new SalaryStructureRepository();