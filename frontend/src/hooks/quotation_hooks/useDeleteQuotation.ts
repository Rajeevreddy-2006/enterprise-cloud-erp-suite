import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import quotationService from "@/services/quotation.service";

export function useDeleteQuotation() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            quotationService.deleteQuotation,

        onSuccess() {

            queryClient.invalidateQueries({
                queryKey: ["quotations"],
            });

        },

    });

}