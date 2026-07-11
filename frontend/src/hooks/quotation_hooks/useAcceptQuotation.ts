import {
    useMutation,
} from "@tanstack/react-query";

import quotationService from "@/services/quotation.service";

import type {
    AcceptQuotation,
} from "@/types/quotation.types";

interface AcceptQuotationPayload {
    token: string;
    data: AcceptQuotation;
}

export function useAcceptQuotation() {

    return useMutation({

        mutationFn: ({
            token,
            data,
        }: AcceptQuotationPayload) =>
            quotationService.acceptQuotation(
                token,
                data
            ),

    });

}