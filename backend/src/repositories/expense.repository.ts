import prisma from "../config/database";

import {

    CreateExpenseDto,

    UpdateExpenseDto

} from "../types/expense.types";

class ExpenseRepository {

    async getAllExpenses() {

        return prisma.expense.findMany({

            include: {

                employee: true,

                tenant: true

            }

        });

    }

    async getExpenseById(

        id: string

    ) {

        return prisma.expense.findUnique({

            where: {

                id

            },

            include: {

                employee: true,

                tenant: true

            }

        });

    }

    async createExpense(

        data: CreateExpenseDto

    ) {

        return prisma.expense.create({

            data,

            include: {

                employee: true,

                tenant: true

            }

        });

    }

    async updateExpense(

        id: string,

        data: UpdateExpenseDto

    ) {

        return prisma.expense.update({

            where: {

                id

            },

            data,

            include: {

                employee: true,

                tenant: true

            }

        });

    }

    async deleteExpense(

        id: string

    ) {

        return prisma.expense.delete({

            where: {

                id

            }

        });

    }

}

export default new ExpenseRepository();