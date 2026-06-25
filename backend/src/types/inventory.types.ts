export interface CreateInventoryDto {
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  tenantId: string;
}

export interface UpdateInventoryDto {
  name?: string;
  sku?: string;
  quantity?: number;
  unitPrice?: number;
}