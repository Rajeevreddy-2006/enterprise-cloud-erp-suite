import interactionLogRepository from "../repositories/interactionLog.repository";
import customerRepository from "../repositories/customer.repository";
import leadRepository from "../repositories/lead.repository";
import opportunityRepository from "../repositories/opportunity.repository";
import employeeRepository from "../repositories/employee.repository";
import AppError from "../utils/AppError";
import { CreateInteractionLogDto, UpdateInteractionLogDto, } from "../types/interactionLog.types";

class InteractionLogService {

  async getAllInteractionLogs() {
    return interactionLogRepository.getAllInteractionLogs();
  }

  async getInteractionLogById(id: string) {
    const interactionLog = await interactionLogRepository.getInteractionLogById(id);
    if (!interactionLog) {
      throw new AppError("Interaction log not found",404);
    }
    return interactionLog;
  }

  async createInteractionLog(data: CreateInteractionLogDto) {
    const customer = await customerRepository.getCustomerById(data.customerId);
    if (!customer) {
      throw new AppError("Customer not found",404);
    }
    if (data.leadId) {
      const lead = await leadRepository.getLeadById(data.leadId);
      if (!lead) {
        throw new AppError("Lead not found",404);
      }
    }
    if (data.opportunityId) {
      const opportunity = await opportunityRepository.getOpportunityById(data.opportunityId);
      if (!opportunity) {
        throw new AppError("Opportunity not found",404);
      }
    }
    if (data.employeeId) {
      const employee = await employeeRepository.getEmployeeById(data.employeeId);
      if (!employee) {
        throw new AppError("Employee not found",404);
      }
    }
    return interactionLogRepository.createInteractionLog(data);
  }

  async updateInteractionLog(id: string,data: UpdateInteractionLogDto) {
    await this.getInteractionLogById(id);
    return interactionLogRepository.updateInteractionLog(id,data);
  }

  async deleteInteractionLog(id: string) {
    await this.getInteractionLogById(id);
    return interactionLogRepository.deleteInteractionLog(id);
  }
}

export default new InteractionLogService();