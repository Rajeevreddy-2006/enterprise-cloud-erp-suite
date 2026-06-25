import { ExpenseStatus } from "../generated/prisma/enums";

export interface CreateExpenseDto {
  title: string;
  description?: string;
  amount: number;
  expenseDate: Date;
  employeeId: string;
  tenantId: string;
}

export interface UpdateExpenseDto {
  status?: ExpenseStatus;
}