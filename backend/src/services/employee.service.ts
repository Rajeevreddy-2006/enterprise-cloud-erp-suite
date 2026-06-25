import employeeRepository from "../repositories/employee.repository";
import userRepository from "../repositories/user.repository";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../types/employee.types";
import { RoleType } from "../generated/prisma/enums";
import AppError from "../utils/AppError";

class EmployeeService {

  async getAllEmployees(tenantId: string,role: RoleType) {
    return employeeRepository.getAllEmployees(tenantId,role);
  }

  async getEmployeeById(id: string) {
    return employeeRepository.getEmployeeById(id);
  }

  async createEmployee(data: CreateEmployeeDto) {
    if (data.userId) {
        const user = await userRepository.getUserById(data.userId);
        if (!user) {
            throw new AppError("User not found",404);
        }
    }
    return employeeRepository.createEmployee(data);
  }

  async updateEmployee(id: string, data: UpdateEmployeeDto) {
    return employeeRepository.updateEmployee(id, data);
  }

  async deleteEmployee(id: string) {
    return employeeRepository.deleteEmployee(id);
  }
}

export default new EmployeeService();