import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import expenseService from "@/services/expense.service";

export function useUpdateExpense() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            {

                id,

                data

            }: {

                id: string;

                data: any;

            }

        ) =>

            expenseService.updateExpense(

                id,

                data

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["expenses"]

            });

        }

    });

}