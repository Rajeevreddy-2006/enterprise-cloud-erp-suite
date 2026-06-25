export interface CreateGRNDto {
  purchaseOrderId: string;
  quantityReceived: number;
  remarks?: string;
  tenantId: string;
}

export interface UpdateGRNDto {
  remarks?: string;
  status?: "PENDING" | "RECEIVED" | "REJECTED";
}