import departmentRepository from "../repositories/department.repository";
import { CreateDepartmentDto, UpdateDepartmentDto } from "../types/department.types";
import { RoleType } from "../generated/prisma/enums";

class DepartmentService {
    async getAllDepartments(tenantId: string,role: RoleType) {
        return departmentRepository.getAllDepartments(tenantId,role);
    }

    async getDepartmentById(id: string) {
        return departmentRepository.getDepartmentById(id);
    }

    async createDepartment(data: CreateDepartmentDto) {
        return departmentRepository.createDepartment(data);
    }

    async updateDepartment(id: string, data: UpdateDepartmentDto) {
        return departmentRepository.updateDepartment(id,data);
    }

    async deleteDepartment(id: string) {
        return departmentRepository.deleteDepartment(id);
    }
}

export default new DepartmentService();