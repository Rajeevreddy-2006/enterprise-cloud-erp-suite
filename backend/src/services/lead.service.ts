import leadRepository from "../repositories/lead.repository";
import customerRepository from "../repositories/customer.repository";
import notificationService from "./notification.service";
import AppError from "../utils/AppError";
import { CreateLeadDto, UpdateLeadDto, } from "../types/lead.types";

class LeadService {

  async getAllLeads() {
    return leadRepository.getAllLeads();
  }

  async getLeadById(id: string) {
    const lead = await leadRepository.getLeadById(id);
    if (!lead) {
      throw new AppError("Lead not found",404);
    }
    return lead;
  }

  async createLead(data: CreateLeadDto) {
    const customer = await customerRepository.getCustomerById(data.customerId);
    if (!customer) {
      throw new AppError("Customer not found",404);
    }
    const lead = await leadRepository.createLead(data);
    await notificationService.createNotification({
      title: "Lead Created",
      message: lead.title,
      tenantId: lead.tenantId,
    });
    return lead;
  }

  async updateLead(id: string,data: UpdateLeadDto) {
    await this.getLeadById(id);
    return leadRepository.updateLead(id,data);
  }

  async deleteLead(id: string) {
    await this.getLeadById(id);
    return leadRepository.deleteLead(id);
  }
}

export default new LeadService();