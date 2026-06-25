import transactionRepository from "../repositories/transaction.repository";
import { CreateTransactionDto, UpdateTransactionDto, } from "../types/transaction.types";
import { RoleType } from "../generated/prisma/enums";
import { Prisma } from "../generated/prisma/client";
import AppError from "../utils/AppError";

class TransactionService {

  async getAllTransactions(tenantId: string,role: RoleType) {
    return transactionRepository.getAllTransactions(tenantId,role);
  }

  async getTransactionById(id: string) {
    return transactionRepository.getTransactionById(id);
  }

  async createTransaction(data: CreateTransactionDto) {
    const account = await transactionRepository.getAccountById(data.accountId);
    if (!account) {
      throw new AppError("Account not found",404);
    }
    let newBalance = new Prisma.Decimal(account.balance);
    const amount = new Prisma.Decimal(data.amount);
    // Debit/Credit Rules
    if (account.type === "ASSET" || account.type === "EXPENSE") {
      if (data.type === "DEBIT") {
        newBalance = newBalance.plus(amount);
      } else {
        newBalance = newBalance.minus(amount);
      }
    } else {
      if (data.type === "CREDIT") {
        newBalance = newBalance.plus(amount);
      } else {
        newBalance = newBalance.minus(amount);
      }
    }
    await transactionRepository.updateAccountBalance(account.id,newBalance);
    const transaction = await transactionRepository.createTransaction(data);
    // Auto Journal Entry
    // await transactionRepository.createJournalEntry({
    //   amount,
    //   debitAccountId: data.type === "DEBIT"? account.id: account.id,
    //   creditAccountId: data.type === "CREDIT"? account.id: account.id,
    //   transactionId: transaction.id,
    //   tenantId: data.tenantId,
    // });
    return transaction;
  }

  async updateTransaction(id: string,data: UpdateTransactionDto) {
    const transaction = await transactionRepository.getTransactionById(id);
    if (!transaction) {
      throw new AppError("Transaction not found",404);
    }
    return transactionRepository.updateTransaction(id,data);
  }

  async deleteTransaction(id: string) {
    const transaction = await transactionRepository.getTransactionById(id);
    if (!transaction) {
      throw new AppError("Transaction not found",404);
    }
    return transactionRepository.deleteTransaction(id);
  }
}

export default new TransactionService();