import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import transactionService from "@/services/transaction.service";

export function useCreateTransaction() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            transactionService.createTransaction,

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