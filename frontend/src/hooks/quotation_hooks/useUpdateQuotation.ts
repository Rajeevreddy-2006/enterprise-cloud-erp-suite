import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import quotationService from "@/services/quotation.service";

export function useUpdateQuotation() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            data,
        }: any) =>
            quotationService.updateQuotation(
                id,
                data
            ),

        onSuccess() {

            queryClient.invalidateQueries({
                queryKey: ["quotations"],
            });

        },

    });

}