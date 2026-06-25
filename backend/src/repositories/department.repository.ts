import prisma from "../config/database";
import { CreateDepartmentDto, UpdateDepartmentDto } from "../types/department.types";
import { RoleType } from "../generated/prisma/enums";

class DepartmentRepositry {
    async getAllDepartments(tenantId: string,role: RoleType) {
        if (role === "SUPER_ADMIN") {
            return prisma.department.findMany({
                include: { tenant: true, employees: true, },
            });
        }
        return prisma.department.findMany({
            where: { tenantId, },
            include: { tenant: true, employees: true, },
        });
    }

    async getDepartmentById(id: string) {
        return prisma.department.findUnique({
            where: {id},
            include: { tenant: true, employees: true },
        });
    }

    async createDepartment(data: CreateDepartmentDto) {
        return prisma.department.create({
            data,
        });
    }

    async updateDepartment(id: string, data: UpdateDepartmentDto) {
        return prisma.department.update({
            where: {id},
            data,
        });
    }

    async deleteDepartment(id: string) {
        return prisma.department.delete({
            where: {id},
        });
    }
}

export default new DepartmentRepositry();