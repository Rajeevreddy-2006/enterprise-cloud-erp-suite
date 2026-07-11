import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import transactionService from "@/services/transaction.service";

export function useDeleteTransaction() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            transactionService.deleteTransaction(

                id

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["transactions"]

            });

            queryClient.invalidateQueries({

                queryKey: ["accounts"]

            });

        }

    });

}