export type ExpenseStatus =

    | "PENDING"

    | "APPROVED"

    | "REJECTED";

export interface Expense {

    id: string;

    title: string;

    description?: string;

    amount: number;

    expenseDate: string;

    status: ExpenseStatus;

    employeeId: string;

    employee?: {

        id: string;

        employeeId: string;

        firstName: string;

        lastName: string;

    };

    createdAt: string;

    updatedAt: string;

}

export interface CreateExpenseDto {

    title: string;

    description?: string;

    amount: number;

    expenseDate: string;

    employeeId: string;

}

export interface UpdateExpenseDto {

    title?: string;

    description?: string;

    amount?: number;

    expenseDate?: string;

    employeeId?: string;

    status?: ExpenseStatus;

}