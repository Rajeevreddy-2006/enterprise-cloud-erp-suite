import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import transactionService from "@/services/transaction.service";

export function useUpdateTransaction() {

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

            transactionService.updateTransaction(

                id,

                data

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