export interface CreateSalaryStructureDto {
  employeeId: string;
  tenantId: string;
  basicSalary: number;
  hra?: number;
  bonus?: number;
  pfPercentage?: number;
  taxPercentage?: number;
}

export interface UpdateSalaryStructureDto {
  basicSalary?: number;
  hra?: number;
  bonus?: number;
  pfPercentage?: number;
  taxPercentage?: number;
}