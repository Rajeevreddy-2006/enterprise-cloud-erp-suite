import opportunityRepository from "../repositories/opportunity.repository";
import customerRepository from "../repositories/customer.repository";
import notificationService from "./notification.service";
import AppError from "../utils/AppError";
import { CreateOpportunityDto, UpdateOpportunityDto, } from "../types/opportunity.types";

class OpportunityService {

  async getAllOpportunities() {
    return opportunityRepository.getAllOpportunities();
  }

  async getOpportunityById(id: string) {
    const opportunity = await opportunityRepository.getOpportunityById(id);
    if (!opportunity) {
      throw new AppError("Opportunity not found",404);
    }
    return opportunity;
  }

  async createOpportunity(data: CreateOpportunityDto) {
    const customer = await customerRepository.getCustomerById(data.customerId);
    if (!customer) {
      throw new AppError("Customer not found",404);
    }
    const opportunity = await opportunityRepository.createOpportunity(data);
    await notificationService.createNotification({
      title: "Opportunity Created",
      message: opportunity.title,
      tenantId: opportunity.tenantId,
    });
    return opportunity;
  }

  async updateOpportunity(id: string,data: UpdateOpportunityDto) {
    await this.getOpportunityById(id);
    return opportunityRepository.updateOpportunity(id,data);
  }

  async deleteOpportunity(id: string) {
    await this.getOpportunityById(id);
    return opportunityRepository.deleteOpportunity(id);
  }
}

export default new OpportunityService();