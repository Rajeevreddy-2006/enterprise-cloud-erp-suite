import expenseRepository from "../repositories/expense.repository";
import approvalService from "./approval.service";
import notificationService from "./notification.service";
import workflowService from "./workflow.service";
import auditLogService from "./auditLog.service";
import AppError from "../utils/AppError";
import { CreateExpenseDto, UpdateExpenseDto, } from "../types/expense.types";

class ExpenseService {

  async getAllExpenses() {
    return expenseRepository.getAllExpenses();
  }

  async getExpenseById(id: string) {
    const expense = await expenseRepository.getExpenseById(id);
    if (!expense) {
      throw new AppError("Expense not found",404);
    }
    return expense;
  }

  async createExpense(data: CreateExpenseDto) {
    const employee = await expenseRepository.getEmployeeById(data.employeeId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    const expense = await expenseRepository.createExpense(data);
    await approvalService.createRequest({
      module: "EXPENSE",
      entityId: expense.id,
      requestedById: employee.userId,
      tenantId: expense.tenantId,
    });
    await workflowService.onExpenseCreated(expense.title,expense.tenantId);
    await auditLogService.createLog({
      action: "CREATE",
      entity: "EXPENSE",
      entityId: expense.id,
      userId: employee.user!.id,
      tenantId: expense.tenantId,
    });
    return expense;
  }

  async updateExpense(id: string,data: UpdateExpenseDto) {
    await this.getExpenseById(id);
    return expenseRepository.updateExpense(id,data);
  }

  async deleteExpense(id: string) {
    await this.getExpenseById(id);
    return expenseRepository.deleteExpense(id);
  }
}

export default new ExpenseService();