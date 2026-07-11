import { useMutation, useQueryClient } from "@tanstack/react-query";
import quotationService from "@/services/quotation.service";

export function useCreateQuotation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn:
            quotationService.createQuotation,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["quotations"],
            });
        },

    });

}