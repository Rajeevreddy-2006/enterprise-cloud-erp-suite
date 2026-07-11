import {
    useMutation,
} from "@tanstack/react-query";

import quotationService from "@/services/quotation.service";

export function useRejectQuotation() {

    return useMutation({

        mutationFn:
            quotationService.rejectQuotation,

    });

}