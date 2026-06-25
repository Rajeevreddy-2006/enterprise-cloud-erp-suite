export interface CreateDepartmentDto {
  name: string;
  tenantId: string;
}

export interface UpdateDepartmentDto {
  name?: string;
}