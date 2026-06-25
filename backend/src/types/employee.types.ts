export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  userId?: string;
  departmentId: string;
  tenantId: string;
}

export interface UpdateEmployeeDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  userId?: string;
  departmentId?: string;
}