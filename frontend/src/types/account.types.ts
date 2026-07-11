export type AccountType =

    | "ASSET"
    | "LIABILITY"
    | "EQUITY"
    | "REVENUE"
    | "EXPENSE";

export interface Account {

    id: string;

    name: string;

    code: string;

    type: AccountType;

    balance: number;

    createdAt: string;

    updatedAt: string;

}

export interface CreateAccountDto {

    name: string;

    code: string;

    type: AccountType;

}

export interface UpdateAccountDto {

    name?: string;

    code?: string;

    type?: AccountType;

}