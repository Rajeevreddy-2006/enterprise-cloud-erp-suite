import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import accountService from "@/services/account.service";

export function useUpdateAccount() {

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

            accountService.updateAccount(

                id,

                data

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["accounts"]

            });

        }

    });

}