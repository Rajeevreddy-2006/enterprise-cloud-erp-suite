import api from "./api";

import type {

    CreateExpenseDto,

    UpdateExpenseDto

} from "@/types/expense.types";

class ExpenseService {

    async getExpenses() {

        const response = await api.get(

            "/expenses"

        );

        return response.data;

    }

    async getExpenseById(

        id: string

    ) {

        const response = await api.get(

            `/expenses/${id}`

        );

        return response.data;

    }

    async createExpense(

        data: CreateExpenseDto

    ) {

        const response = await api.post(

            "/expenses",

            data

        );

        return response.data;

    }

    async updateExpense(

        id: string,

        data: UpdateExpenseDto

    ) {

        const response = await api.put(

            `/expenses/${id}`,

            data

        );

        return response.data;

    }

    async deleteExpense(

        id: string

    ) {

        const response = await api.delete(

            `/expenses/${id}`

        );

        return response.data;

    }

}

export default new ExpenseService();