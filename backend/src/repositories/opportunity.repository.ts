import prisma from "../config/database";
import { CreateOpportunityDto, UpdateOpportunityDto, } from "../types/opportunity.types";
 
class OpportunityRepository {

  async getAllOpportunities() {
    return prisma.opportunity.findMany({
      include: { customer: true, tenant: true, },
    });
  }

  async getOpportunityById(id: string) {
    return prisma.opportunity.findUnique({
      where: { id },
      include: { customer: true, tenant: true, },
    });
  }

  async createOpportunity(data: CreateOpportunityDto) {
    return prisma.opportunity.create({data,});
  }

  async updateOpportunity(id: string,data: UpdateOpportunityDto) {
    return prisma.opportunity.update({
      where: { id },
      data,
    });
  }

  async deleteOpportunity(id: string) {
    return prisma.opportunity.delete({
      where: { id },
    });
  }
}

export default new OpportunityRepository();