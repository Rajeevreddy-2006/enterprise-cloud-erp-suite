import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import expenseService from "@/services/expense.service";

export function useDeleteExpense() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            expenseService.deleteExpense(

                id

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["expenses"]

            });

        }

    });

}