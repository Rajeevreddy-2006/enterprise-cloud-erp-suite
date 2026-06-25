import { ApprovalStatus } from "../generated/prisma/enums";

export interface CreateApprovalRequestDto {
  module: string;
  entityId: string;
  requestedById: string;
  tenantId: string;
}

export interface UpdateApprovalRequestDto {
  status: ApprovalStatus;
  remarks?: string;
  approvedById: string;
}