export interface CreateSalaryStructureDto {
  employeeId: string;
  basicSalary: number;
  hra?: number;
  bonus?: number;
  pfPercentage?: number;
  taxPercentage?: number;
}

export interface SalaryStructureDbDto
  extends CreateSalaryStructureDto {
  tenantId: string;
}

export interface UpdateSalaryStructureDto {
  basicSalary?: number;
  hra?: number;
  bonus?: number;
  pfPercentage?: number;
  taxPercentage?: number;
}