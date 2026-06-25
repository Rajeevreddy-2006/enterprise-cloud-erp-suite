export interface CreateSupplierDto {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  tenantId: string;
}

export interface UpdateSupplierDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}