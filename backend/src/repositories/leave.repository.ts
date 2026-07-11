import prisma from "../config/database";
import { CreateLeaveDto, UpdateLeaveDto, } from "../types/leave.types";
import { RoleType } from "../generated/prisma/enums";

class LeaveRepository {

  async getAllLeaves(tenantId: string,role: RoleType) {
    if (role === "TENANT_ADMIN") {
      return prisma.leave.findMany({
        include: { employee: true, tenant: true, },
        orderBy: { createdAt: "desc", },
      });
    }
    return prisma.leave.findMany({
      where: { tenantId, },
      include: { employee: true, tenant: true, },
      orderBy: { createdAt: "desc", },
    });
  }

  async getEmployeeLeaves(employeeId: string) {
    return prisma.leave.findMany({
      where: { employeeId },
      include:{
        employee:{
            include:{
              user:true
            }
        }
      },
      orderBy: { startDate: "desc" }
    });
  }

  async leaveBalance(employeeId: string) {
    const approved = await prisma.leave.findMany({
        where: {
          employeeId,
          status: "APPROVED"
        }
      });
    return {
      casual:
        approved.filter(
          x =>
            x.leaveType === "CASUAL"
        ).length,
      sick:
        approved.filter(
          x =>
            x.leaveType === "SICK"
        ).length,
      earned:
        approved.filter(
          x =>
            x.leaveType === "EARNED"
        ).length,
      unpaid:
        approved.filter(
          x =>
            x.leaveType === "UNPAID"
        ).length
    };
  }

  async approveLeave(id: string) {
    return prisma.leave.update({
      where: { id },
      include:{
        employee:{
            include:{
              user:true
            }
        }
      },
      data: {
        status: "APPROVED"
      }
    });
  }

  async rejectLeave(id: string) {
    return prisma.leave.update({
      where: { id },
      include:{
        employee:{
            include:{
              user:true
            }
        }
      },
      data: {
        status: "REJECTED"
      }
    });
  }

  async getLeaveById(id: string) {
    return prisma.leave.findUnique({
      where: { id },
      include:{
        employee:{
            include:{
              user:true
            }
        },tenant: true,
      },
    });
  }

  async createLeave(data: CreateLeaveDto) {
    return prisma.leave.create({
      data,
      include: { employee: true, tenant: true, },
    });
  }

  async updateLeave(id: string,data: UpdateLeaveDto) {
    return prisma.leave.update({
      where: { id },
      data,
      include: { employee: true, tenant: true, },
    });
  }

  async deleteLeave(id: string) {
    return prisma.leave.delete({
      where: { id },
    });
  }

  async getEmployeeById(employeeId: string) {
    return prisma.employee.findUnique({
      where: { id: employeeId, },
    });
  }
}

export default new LeaveRepository();