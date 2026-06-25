import { LeadStatus } from "../generated/prisma/enums";

export interface CreateLeadDto {
  title: string;
  customerId: string;
  tenantId: string;
}

export interface UpdateLeadDto {
  title?: string;
  status?: LeadStatus;
}