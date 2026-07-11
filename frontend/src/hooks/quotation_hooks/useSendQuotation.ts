import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import quotationService from "@/services/quotation.service";

export function useSendQuotation() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            quotationService.sendQuotation,

        onSuccess() {

            queryClient.invalidateQueries({
                queryKey: ["quotations"],
            });

        },

    });

}