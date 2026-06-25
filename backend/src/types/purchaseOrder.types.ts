import { PurchaseOrderStatus } from "../generated/prisma/enums";

export interface CreatePurchaseOrderDto {
  orderNumber: string;
  quantity: number;
  unitPrice: number;
  status?: PurchaseOrderStatus;
  inventoryItemId: string;
  tenantId: string;
}

export interface UpdatePurchaseOrderDto {
  quantity?: number;
  unitPrice?: number;
  status?: PurchaseOrderStatus;
}