import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import accountService from "@/services/account.service";

export function useCreateAccount() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: accountService.createAccount,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["accounts"]

            });

        }

    });

}