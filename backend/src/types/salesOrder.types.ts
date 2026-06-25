import { SalesOrderStatus } from "../generated/prisma/enums";

export interface CreateSalesOrderDto {
  customerId: string;
  inventoryItemId: string;
  quantity: number;
  tenantId: string;
}

export interface UpdateSalesOrderDto {
  status?: SalesOrderStatus;
}