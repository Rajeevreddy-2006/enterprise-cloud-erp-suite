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

  async employeeLeaves(employeeId: string) {
    return leaveRepository
      .getEmployeeLeaves(
        employeeId
      );
  }

  async leaveBalance(employeeId: string) {
    return leaveRepository
      .leaveBalance(
        employeeId
      );
  }

  async approveLeave(id: string,approver: any) {
    const leave = await leaveRepository.getLeaveById(id);
    if (!leave) {
        throw new Error("Leave not found");
    }
    if (!leave.employee?.user) {
        throw new Error(
            "Employee user not found"
        );
    }
    const employeeRole = leave.employee.user.role;
    const approverRole = approver.role;
    // HR leave
    if ( employeeRole === "HR" && approverRole !== "SUPER_ADMIN") {
        throw new Error(
            "Only SUPER_ADMIN can approve HR leaves"
        );
    }
    // Tenant admin leave
    if (employeeRole === "TENANT_ADMIN" && approverRole !== "SUPER_ADMIN") {
        throw new Error(
          "Only SUPER_ADMIN can approve Tenant Admin leaves"
        );
    }
    // Super admin leave
    if (employeeRole === "SUPER_ADMIN") {
        throw new Error(
          "SUPER_ADMIN leave cannot be approved"
        );
    }
    return leaveRepository.approveLeave(id);
  }

  async rejectLeave(id:string,approver:any){
    const leave = await leaveRepository.getLeaveById(id);
    if(!leave){
        throw new Error(
          "Leave not found"
        );
    }
    if(!leave.employee?.user){
        throw new Error(
          "Employee user missing"
        );
    }
    const employeeRole = leave.employee.user.role;
    const approverRole = approver.role;
    if(employeeRole==="HR" && approverRole!=="SUPER_ADMIN"){
        throw new Error(
          "Only SUPER_ADMIN can reject HR leaves"
        );
    }
    if(employeeRole==="TENANT_ADMIN" && approverRole!=="SUPER_ADMIN"){
        throw new Error(
            "Only SUPER_ADMIN can reject Tenant Admin leaves"
        );
    }
    if(employeeRole==="SUPER_ADMIN"){
        throw new Error(
            "SUPER_ADMIN leave cannot be rejected"
        );
    }
    return leaveRepository.rejectLeave(id);
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
    const payload = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    return leaveRepository.createLeave(payload);
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

  // async approveLeave(id: string) {
  //   const leave = await leaveRepository.getLeaveById(id);
  //   if (!leave) {
  //       throw new AppError("Leave not found",404);
  //   }
  //   const updatedLeave = await leaveRepository.updateLeave(id,{ status: "APPROVED",});
  //   await safeSendEmail(leave.employee.email,"Leave Approved",
  //       leaveApprovedTemplate(`${leave.employee.firstName} ${leave.employee.lastName}`)
  //   );
  //   return updatedLeave;
  // }

  // async rejectLeave(id: string) {
  //   const leave = await leaveRepository.getLeaveById(id);
  //   if (!leave) {
  //       throw new AppError("Leave not found",404);
  //   }
  //   const updatedLeave = await leaveRepository.updateLeave(id,{ status: "REJECTED", });
  //   await safeSendEmail(leave.employee.email,"Leave Rejected",
  //       leaveRejectedTemplate(`${leave.employee.firstName} ${leave.employee.lastName}`)
  //   );
  //   return updatedLeave;
  // }
}

export default new LeaveService();