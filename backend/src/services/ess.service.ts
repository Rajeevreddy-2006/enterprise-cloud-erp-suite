import employeeRepository from "../repositories/employee.repository";
import AppError from "../utils/AppError";

class EssService {

  async getMyProfile(userId: string) {
    const employee = await employeeRepository.getEmployeeByUserId(userId);
    if (!employee) {
      throw new AppError("Employee profile not found",404);
    }
    return employee;
  }

  async getMyAttendance(userId: string) {
    const employee = await employeeRepository.getEmployeeByUserId(userId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    return employee.attendances;
  }

  async getMyLeaves(userId: string) {
    const employee = await employeeRepository.getEmployeeByUserId(userId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    return employee.leaves;
  }

  async getMyPayrolls(userId: string) {
    const employee = await employeeRepository.getEmployeeByUserId(userId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    return employee.payrolls;
  }
}

export default new EssService();