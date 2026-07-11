import api from "./api";

import type {
    CreateTransactionDto,
    UpdateTransactionDto
} from "@/types/transaction.types";

class TransactionService {

    async getTransactions() {

        const response =
            await api.get(
                "/transactions"
            );

        return response.data;

    }

    async getTransactionById(

        id: string

    ) {

        const response =
            await api.get(
                `/transactions/${id}`
            );

        return response.data;

    }

    async createTransaction(

        data: CreateTransactionDto

    ) {

        const response =
            await api.post(
                "/transactions",
                data
            );

        return response.data;

    }

    async updateTransaction(

        id: string,

        data: UpdateTransactionDto

    ) {

        const response =
            await api.put(
                `/transactions/${id}`,
                data
            );

        return response.data;

    }

    async deleteTransaction(

        id: string

    ) {

        const response =
            await api.delete(
                `/transactions/${id}`
            );

        return response.data;

    }

}

export default new TransactionService();