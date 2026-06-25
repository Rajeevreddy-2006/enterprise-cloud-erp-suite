export interface CreateTenantDto {
  name: string;
  slug: string;
}

export interface UpdateTenantDto {
  name?: string;
  slug?: string;
  isActive?: boolean;
}