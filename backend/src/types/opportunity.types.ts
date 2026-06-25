import { OpportunityStatus } from "../generated/prisma/enums";

export interface CreateOpportunityDto {
  title: string;
  value: number;
  customerId: string;
  tenantId: string;
}

export interface UpdateOpportunityDto {
  title?: string;
  value?: number;
  status?: OpportunityStatus;
}