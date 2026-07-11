export type TransactionType =

    | "DEBIT"

    | "CREDIT";

export interface Transaction {

    id: string;

    description: string;

    amount: number;

    type: TransactionType;

    accountId: string;

    account?: {

        id: string;

        name: string;

        code: string;

    };

    createdAt: string;

    updatedAt: string;

}

export interface CreateTransactionDto {

    description: string;

    amount: number;

    type: TransactionType;

    accountId: string;

}

export interface UpdateTransactionDto {

    description?: string;

    amount?: number;

    type?: TransactionType;

    accountId?: string;

}