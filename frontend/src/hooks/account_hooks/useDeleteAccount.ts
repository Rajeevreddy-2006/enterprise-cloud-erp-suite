import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import accountService from "@/services/account.service";

export function useDeleteAccount() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            accountService.deleteAccount(

                id

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["accounts"]

            });

        }

    });

}