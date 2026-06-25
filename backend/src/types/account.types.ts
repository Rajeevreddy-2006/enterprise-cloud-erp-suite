export interface CreateAccountDto {
  name: string;
  code: string;
  type:
    | "ASSET"
    | "LIABILITY"
    | "EQUITY"
    | "REVENUE"
    | "EXPENSE";
  tenantId: string;
}

export interface UpdateAccountDto {
  name?: string;
  code?: string;
  type?:
    | "ASSET"
    | "LIABILITY"
    | "EQUITY"
    | "REVENUE"
    | "EXPENSE";
}