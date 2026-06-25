import leaveRepository from "../repositories/leave.repository";
import { CreateLeaveDto, UpdateLeaveDto, } from "../types/leave.types";
import { RoleType } from "../generated/prisma/enums";
import AppError from "../utils/AppError";
import emailService from "./email.service";
import { leaveApprovedTemplate } from "../templates/leaveApproved.template";
import { leaveRejectedTemplate } from "../templates/leaveRejected.template";
import { safeSendEmail } from "../utils/safeEmail";
import workflowService from "./workflow.service";

class LeaveService {

  async getAllLeaves(tenantId: string,role: RoleType) {
    return leaveRepository.getAllLeaves(tenantId,role);
  }

  async getLeaveById(id: string) {
    return leaveRepository.getLeaveById(id);
  }

  async createLeave(data: CreateLeaveDto) {
    const employee = await leaveRepository.getEmployeeById(data.employeeId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    if (data.endDate < data.startDate) {
      throw new AppError("End date cannot be before start date",400);
    }
    return leaveRepository.createLeave(data);
  }

  async updateLeave(id: string,data: UpdateLeaveDto) {
    const leave = await leaveRepository.getLeaveById(id);
    if (!leave) {
      throw new AppError("Leave not found",404);
    }
    const updatedLeave = await leaveRepository.updateLeave( id, { status: "APPROVED", });
    await workflowService.onLeaveApproved(`${leave.employee.firstName} ${leave.employee.lastName}`,leave.tenantId);
    return updatedLeave;
  }

  async deleteLeave(id: string) {
    const leave = await leaveRepository.getLeaveById(id);
    if (!leave) {
      throw new AppError("Leave not found",404);
    }
    return leaveRepository.deleteLeave(id);
  }

  async approveLeave(id: string) {
    const leave = await leaveRepository.getLeaveById(id);
    if (!leave) {
        throw new AppError("Leave not found",404);
    }
    const updatedLeave = await leaveRepository.updateLeave(id,{ status: "APPROVED",});
    await safeSendEmail(leave.employee.email,"Leave Approved",
        leaveApprovedTemplate(`${leave.employee.firstName} ${leave.employee.lastName}`)
    );
    return updatedLeave;
  }

  async rejectLeave(id: string) {
    const leave = await leaveRepository.getLeaveById(id);
    if (!leave) {
        throw new AppError("Leave not found",404);
    }
    const updatedLeave = await leaveRepository.updateLeave(id,{ status: "REJECTED", });
    await safeSendEmail(leave.employee.email,"Leave Rejected",
        leaveRejectedTemplate(`${leave.employee.firstName} ${leave.employee.lastName}`)
    );
    return updatedLeave;
  }
}

export default new LeaveService();