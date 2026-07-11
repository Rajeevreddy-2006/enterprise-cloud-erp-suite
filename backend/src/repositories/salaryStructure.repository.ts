import prisma from "../config/database";
import { CreateSalaryStructureDto, UpdateSalaryStructureDto, SalaryStructureDbDto } from "../types/salaryStructure.types";
import { RoleType } from "../generated/prisma/enums";

class SalaryStructureRepository {

  async getAllSalaryStructures(tenantId: string,role: RoleType) {
    if (role === "TENANT_ADMIN") {
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

  async createSalaryStructure(data: SalaryStructureDbDto) {
    console.log("REPOSITORY DATA");
    console.log(data);
    try {
      return await prisma.salaryStructure.create({
        data: {
          employeeId: data.employeeId,
          tenantId: data.tenantId,
          basicSalary: data.basicSalary,
          hra: data.hra ?? 0,
          bonus: data.bonus ?? 0,
          pfPercentage: data.pfPercentage ?? 12,
          taxPercentage: data.taxPercentage ?? 0
        },
        include: {
          employee: true,
          tenant: true
        }
      });
    }catch (err) {
      console.log(err);
      throw err;
    }
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