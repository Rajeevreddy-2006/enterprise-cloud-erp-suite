import { Request, Response } from "express";
import transactionService from "../services/transaction.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import auditLogService from "../services/auditLog.service";

class TransactionController {

  getAllTransactions = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const transactions = await transactionService.getAllTransactions(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(transactions,"Transactions fetched successfully")
      );
    }
  );

  getTransactionById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const transaction = await transactionService.getTransactionById(id);
      if (!transaction) {
        throw new AppError("Transaction not found",404);
      }
      return res.status(200).json(
        successResponse(transaction,"Transaction fetched successfully")
      );
    }
  );

  createTransaction = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const transaction =
        await transactionService.createTransaction({
          ...req.body,
          tenantId: user.tenantId
        });
      return res.status(201).json(
        successResponse(
          transaction,
          "Transaction created successfully"
        )
      );
    }
  );

  updateTransaction = asyncHandler(
    async (req: Request, res: Response) => {
      const transaction =
        await transactionService.updateTransaction(
          req.params.id as string,
          req.body
        );
      return res.status(200).json(
        successResponse(
          transaction,
          "Transaction updated successfully"
        )
      );
    }
  );

  deleteTransaction = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      await transactionService.deleteTransaction(id);
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "DELETE",
            entity: "TRANSACTION",
            entityId: id,
        }
      );
      return res.status(200).json(
        successResponse(null,"Transaction deleted successfully")
      );
    }
  );

}

export default new TransactionController();