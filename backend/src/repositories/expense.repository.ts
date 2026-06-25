import prisma from "../config/database";
import { CreateExpenseDto, UpdateExpenseDto, } from "../types/expense.types";

class ExpenseRepository {

  async getAllExpenses() {
    return prisma.expense.findMany({
      include: { employee: true, tenant: true, },
    });
  }

  async getExpenseById(id: string) {
    return prisma.expense.findUnique({
      where: { id },
      include: { employee: true, tenant: true, },
    });
  }

  async createExpense(data: CreateExpenseDto) {
    return prisma.expense.create({ data, });
  }

  async updateExpense(id: string,data: UpdateExpenseDto) {
    return prisma.expense.update({
      where: { id },
      data,
    });
  }

  async deleteExpense(id: string) {
    return prisma.expense.delete({
      where: { id },
    });
  }

  async getEmployeeById(employeeId: string) {
    return prisma.employee.findUnique({
      where: { id: employeeId },
      include: { user: true, },
    });
  }
}

export default new ExpenseRepository();