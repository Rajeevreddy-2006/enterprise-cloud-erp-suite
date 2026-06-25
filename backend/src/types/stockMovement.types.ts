import { StockMovementType } from "../generated/prisma/enums";

export interface CreateStockMovementDto {
  movementType: StockMovementType;
  quantity: number;
  remarks?: string;
  inventoryItemId: string;
  tenantId: string;
}