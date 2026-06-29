import { InteractionType } from "../generated/prisma/enums";

export interface CreateInteractionLogDto {
  interactionType: InteractionType;
  subject: string;
  notes?: string;
  interactionDate?: Date;
  customerId: string;
  leadId?: string;
  opportunityId?: string;
  employeeId?: string;
  tenantId: string;
}

export interface UpdateInteractionLogDto {
  interactionType?: InteractionType;
  subject?: string;
  notes?: string;
  interactionDate?: Date;
}