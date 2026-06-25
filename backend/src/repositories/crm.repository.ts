import prisma from "../config/database";
import { OpportunityStatus, LeadStatus } from "../generated/prisma/enums";

class CrmRepository {
  async getDashboard(tenantId: string) {
    const [
      totalCustomers,
      totalLeads,
      qualifiedLeads,
      totalOpportunities,
      openOpportunities,
      wonOpportunities,
      lostOpportunities,
    ] = await Promise.all([
      prisma.customer.count({
        where: { tenantId },
      }),
      prisma.lead.count({
        where: { tenantId },
      }),
      prisma.lead.count({
        where: {
          tenantId,
          status: LeadStatus.QUALIFIED,
        },
      }),
      prisma.opportunity.count({
        where: { tenantId },
      }),
      prisma.opportunity.count({
        where: {
          tenantId,
          status: OpportunityStatus.OPEN,
        },
      }),
      prisma.opportunity.count({
        where: {
          tenantId,
          status: OpportunityStatus.WON,
        },
      }),
      prisma.opportunity.count({
        where: {
          tenantId,
          status: OpportunityStatus.LOST,
        },
      }),
    ]);
    return {
      totalCustomers,
      totalLeads,
      qualifiedLeads,
      totalOpportunities,
      openOpportunities,
      wonOpportunities,
      lostOpportunities,
    };
  }
}

export default new CrmRepository();