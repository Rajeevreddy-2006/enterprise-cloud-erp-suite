import prisma from "../config/database";
import { CreateDepartmentDto, UpdateDepartmentDto } from "../types/department.types";
import { RoleType } from "../generated/prisma/enums";

class DepartmentRepositry {
    async getAllDepartments(tenantId: string, role: RoleType) {
        if (role === "TENANT_ADMIN") {
            return prisma.department.findMany({
                where: {
                    tenantId
                },
                include: {
                    tenant: true,
                    _count: {
                        select: {
                            employees: true,
                        },
                    },
                },
            });
        }
        return prisma.department.findMany({
            where: {
                tenantId,
            },
            include: {
                tenant: true,
                _count: {
                    select: {
                        employees: true,
                    },
                },
            },
        });
    }

    async getDepartmentById(id: string) {
        return prisma.department.findUnique({
            where: {id},
            include: { tenant: true, employees: true },
        });
    }

    async getFirstDepartmentByTenantId(tenantId:string){
        return prisma.department.findFirst({
            where: { tenantId }
        });
    }

    async createDepartment(data: CreateDepartmentDto) {
        return prisma.department.create({
            data: {
                name: data.name,
                description: data.description,
                tenantId: data.tenantId
            }
        });
    }

    async updateDepartment(id: string,data: UpdateDepartmentDto) {
        return prisma.department.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description
            }
        });
    }

    async deleteDepartment(id: string) {
        return prisma.department.delete({
            where: {id},
        });
    }
}

export default new DepartmentRepositry();