import prisma from "../config/database";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../types/employee.types";
import { RoleType } from "../generated/prisma/enums";


class EmployeeRepository {

  async getAllEmployees(tenantId: string,role: RoleType) {
    if (role === "TENANT_ADMIN") {
      return prisma.employee.findMany({
        include:{
            user:true,
            department:true,
            tenant:true,
            salaryStructure:true
        },
      });
    }
    return prisma.employee.findMany({
      where: { tenantId, },
      include:{
            user:true,
            department:true,
            tenant:true,
            salaryStructure:true
      },
    });
  }

  async getEmployeeProfile(id:string){
    return prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        user: true,
        salaryStructure: true
      }
    });
  }

  async getEmployeeByUserId(userId: string) {
    return prisma.employee.findUnique({
        where: { userId, },
        include: { department: true, tenant: true, salaryStructure: true, payrolls: true, attendances: true, leaves: true, },
    });
  }

  async createEmployee(data:any){
    return prisma.employee.create({
        data,
        include:{
          user:true,
          department:true,
          tenant:true,
          salaryStructure:true
        }
    });
  }

  async getEmployeeById(id: string) {
    return prisma.employee.findUnique({
        where: { id },
        include:{
          user:true,
          department:true,
          tenant:true,
          salaryStructure:true
        }
    });
  }

  async updateEmployee(id: string, data: UpdateEmployeeDto) {
    return prisma.employee.update({
        where: { id },
        data,
        include:{
          user:true,
          department:true,
          tenant:true,
          salaryStructure:true
        }
    });
  }

  async deleteEmployee(id: string) {
    return prisma.employee.delete({
        where: { id },
    });
  }
}

export default new EmployeeRepository();