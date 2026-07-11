import { TransactionType } from "../generated/prisma/enums";

export interface CreateTransactionDto {
  description: string;
  amount: number;
  type: TransactionType;
  accountId: string;
  tenantId?: string;
}

export interface UpdateTransactionDto {
  description?: string;
  amount?: number;
  type?: TransactionType;
  accountId?: string;
}