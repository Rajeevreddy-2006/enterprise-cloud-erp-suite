export interface Payment {

    id: string;

    paymentNumber: string;

    amount: number;

    paymentDate: string;

    status:
        | "PENDING"
        | "COMPLETED"
        | "FAILED";

    invoiceId: string;

    invoice?: {

        id: string;

        invoiceNumber: string;

        amount: number;

        salesOrder?: {

            customer?: {

                name: string;

            };

        };

    };

}

export interface CreatePaymentDto {

    invoiceId: string;

    amount: number;

    paymentDate: string;

}

export interface UpdatePaymentDto {

    paymentDate?: string;

}