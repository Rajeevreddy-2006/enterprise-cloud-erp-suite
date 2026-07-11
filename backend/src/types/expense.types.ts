import { ExpenseStatus } from "../generated/prisma/enums";

export interface CreateExpenseDto {

    title: string;

    description?: string;

    amount: number;

    expenseDate: Date;

    employeeId: string;

    tenantId: string;

    status?: ExpenseStatus;

}

export interface UpdateExpenseDto {

    title?: string;

    description?: string;

    amount?: number;

    expenseDate?: Date;

    employeeId?: string;

    status?: ExpenseStatus;

}