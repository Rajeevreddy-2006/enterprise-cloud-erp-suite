export interface JournalEntry {

    id: string;

    amount: number;

    debitAccountId: string;

    creditAccountId: string;

    transactionId: string;

    debitAccount?: {

        id: string;

        name: string;

        code: string;

    };

    creditAccount?: {

        id: string;

        name: string;

        code: string;

    };

    transaction?: {

        id: string;

        description: string;

    };

    createdAt: string;

}

export interface CreateJournalEntryDto {

    amount: number;

    debitAccountId: string;

    creditAccountId: string;

    transactionId: string;

}

export interface UpdateJournalEntryDto {

    amount?: number;

    debitAccountId?: string;

    creditAccountId?: string;

    transactionId?: string;

}