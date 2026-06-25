export interface CreateCustomerDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  tenantId: string;
}

export interface UpdateCustomerDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}