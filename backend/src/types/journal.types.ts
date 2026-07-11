export interface CreateJournalEntryDto {

    amount: number;

    debitAccountId: string;

    creditAccountId: string;

    transactionId: string;

    tenantId: string;

}

export interface UpdateJournalEntryDto {

    amount?: number;

    debitAccountId?: string;

    creditAccountId?: string;

    transactionId?: string;

}