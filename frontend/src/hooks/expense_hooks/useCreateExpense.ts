import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import expenseService from "@/services/expense.service";

export function useCreateExpense() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            expenseService.createExpense,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["expenses"]

            });

        }

    });

}