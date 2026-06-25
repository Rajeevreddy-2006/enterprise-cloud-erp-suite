import { PayrollStatus } from "../generated/prisma/enums";
import { Prisma } from "../generated/prisma/client";

export interface CreatePayrollDto {
  employeeId: string;
  tenantId: string;
  month: number;
  year: number;
}

export interface PayrollCreateData {
  employeeId: string;
  tenantId: string;

  month: number;
  year: number;

  grossSalary: Prisma.Decimal;
  deductions: Prisma.Decimal;
  netSalary: Prisma.Decimal;

  status: PayrollStatus;
}

export interface UpdatePayrollDto {
  status?: PayrollStatus;
}