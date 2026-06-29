import { Request, Response } from "express";
import expenseService from "../services/expense.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class ExpenseController {

  getAllExpenses = asyncHandler(
    async (req: Request,res: Response) => {
      const expenses = await expenseService.getAllExpenses();
      return res.status(200).json(
        successResponse(expenses,"Expenses fetched successfully")
      );
    }
  );

  getExpenseById = asyncHandler(
    async (req: Request,res: Response) => {
      const expense = await expenseService.getExpenseById(req.params.id as string);
      return res.status(200).json(
        successResponse(expense,"Expense fetched successfully")
      );
    }
  );

  createExpense = asyncHandler(
    async (req: Request,res: Response) => {
      const user = (req as any).user;
      const expense = await expenseService.createExpense(
        { ...req.body, tenantId: user.tenantId, },
        { userId: user.id, tenantId: user.tenantId,}
      );
      return res.status(201).json(
        successResponse(expense,"Expense created successfully")
      );
    }
  );

  updateExpense = asyncHandler(
    async (req: Request,res: Response) => {
      const expense = await expenseService.updateExpense(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(expense,"Expense updated successfully")
      );
    }
  );

  deleteExpense = asyncHandler(
    async (req: Request,res: Response) => {
      await expenseService.deleteExpense(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Expense deleted successfully")
      );
    }
  );
}

export default new ExpenseController();