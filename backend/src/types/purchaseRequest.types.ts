import { PurchaseRequestStatus, } from "../generated/prisma/enums";

export interface CreatePurchaseRequestDto {
  title: string;
  description?: string;
  quantity: number;
  inventoryItemId: string;
  requestedById: string;
  tenantId: string;
}

export interface UpdatePurchaseRequestDto {
  title?: string;
  description?: string;
  quantity?: number;
  inventoryItemId?: string;
}

export interface ApprovePurchaseRequestDto {
  status: PurchaseRequestStatus;
}