import prisma from "../config/database";
import { CreateTransactionDto,UpdateTransactionDto, } from "../types/transaction.types";
import { RoleType } from "../generated/prisma/enums";
import { Prisma } from "../generated/prisma/client";

class TransactionRepository {

  async getAllTransactions(tenantId: string,role: RoleType) {
    if (role === "TENANT_ADMIN") {
      return prisma.transaction.findMany({
        include: { account: true, tenant: true, journalEntries: true, },
        orderBy: { createdAt: "desc", },
      });
    }
    return prisma.transaction.findMany({
      where: { tenantId, },
      include: { account: true, tenant: true, journalEntries: true, },
      orderBy: { createdAt: "desc", },
    });
  }

  async getTransactionById(id: string) {
    return prisma.transaction.findUnique({
      where: { id },
      include: { account: true, tenant: true, journalEntries: true, },
    });
  }

  async createTransaction(data: CreateTransactionDto) {
    return prisma.transaction.create({
      data,
      include: { account: true, tenant: true, journalEntries: true, },
    });
  }

  async updateTransaction(id: string,data: UpdateTransactionDto) {
    return prisma.transaction.update({
      where: { id },
      data,
      include: { account: true, tenant: true, journalEntries: true, },
    });
  }

  async deleteTransaction(id: string) {
    return prisma.transaction.delete({
      where: { id },
    });
  }

  // Account Helpers
  async getAccountById(accountId: string) {
    return prisma.account.findUnique({
      where: { id: accountId },
    });
  }

  async updateAccountBalance(accountId: string,balance: Prisma.Decimal) {
    return prisma.account.update({
      where: { id: accountId, },
      data: { balance, },
    });
  }

  // Journal Entry Helpers
  async createJournalEntry(data: {
    amount: Prisma.Decimal;
    debitAccountId: string;
    creditAccountId: string;
    transactionId: string;
    tenantId: string;
  }) {
    return prisma.journalEntry.create({
      data,
      include: { debitAccount: true, creditAccount: true, transaction: true, tenant: true, },
    });
  }
}

export default new TransactionRepository();