import salaryStructureRepository from "../repositories/salaryStructure.repository";
import { CreateSalaryStructureDto, UpdateSalaryStructureDto, SalaryStructureDbDto } from "../types/salaryStructure.types";
import { RoleType } from "../generated/prisma/enums";
import AppError from "../utils/AppError";

class SalaryStructureService {

  async getAllSalaryStructures(tenantId: string,role: RoleType) {
    return salaryStructureRepository.getAllSalaryStructures(tenantId,role);
  }

  async getSalaryStructureById(id: string) {
    return salaryStructureRepository.getSalaryStructureById(id);
  }

  async createSalaryStructure(data: SalaryStructureDbDto) {
    const employee = await salaryStructureRepository.getEmployeeById(data.employeeId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    const existing = await salaryStructureRepository.getSalaryStructureByEmployeeId(data.employeeId);
    if (existing) {
      throw new AppError("Salary structure already exists for this employee",400);
    }
    return salaryStructureRepository.createSalaryStructure(data);
  }

  async updateSalaryStructure(id: string,data: UpdateSalaryStructureDto) {
    const salaryStructure = await salaryStructureRepository.getSalaryStructureById(id);
    if (!salaryStructure) {
      throw new AppError("Salary structure not found",404);
    }
    return salaryStructureRepository.updateSalaryStructure(id,data);
  }

  async deleteSalaryStructure(id: string) {
    const salaryStructure = await salaryStructureRepository.getSalaryStructureById(id);
    if (!salaryStructure) {
      throw new AppError("Salary structure not found",404);
    }
    return salaryStructureRepository.deleteSalaryStructure(id);
  }
}

export default new SalaryStructureService();