import expenseRepository from "../repositories/expense.repository";

import {

    CreateExpenseDto,

    UpdateExpenseDto

} from "../types/expense.types";

import AppError from "../utils/AppError";

class ExpenseService {

    async getAllExpenses() {

        return expenseRepository.getAllExpenses();

    }

    async getExpenseById(

        id: string

    ) {

        const expense =

            await expenseRepository.getExpenseById(

                id

            );

        if (!expense) {

            throw new AppError(

                "Expense not found",

                404

            );

        }

        return expense;

    }

    async createExpense(

        data: CreateExpenseDto

    ) {

        return expenseRepository.createExpense({

            ...data,

            status: "PENDING"

        });

    }

    async updateExpense(

        id: string,

        data: UpdateExpenseDto

    ) {

        await this.getExpenseById(id);

        return expenseRepository.updateExpense(

            id,

            data

        );

    }

    async deleteExpense(

        id: string

    ) {

        await this.getExpenseById(id);

        return expenseRepository.deleteExpense(

            id

        );

    }

}

export default new ExpenseService();