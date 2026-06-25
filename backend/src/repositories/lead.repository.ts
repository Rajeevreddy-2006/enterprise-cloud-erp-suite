import prisma from "../config/database";
import { CreateLeadDto, UpdateLeadDto, } from "../types/lead.types";

class LeadRepository {

  async getAllLeads() {
    return prisma.lead.findMany({
      include: { customer: true, tenant: true, },
    });
  }

  async getLeadById(id: string) {
    return prisma.lead.findUnique({
      where: { id },
      include: { customer: true, tenant: true, },
    });
  }

  async createLead(data: CreateLeadDto) {
    return prisma.lead.create({ data, });
  }

  async updateLead(id: string,data: UpdateLeadDto) {
    return prisma.lead.update({
      where: { id },
      data,
    });
  }

  async deleteLead(id: string) {
    return prisma.lead.delete({
      where: { id },
    });
  }
}

export default new LeadRepository();