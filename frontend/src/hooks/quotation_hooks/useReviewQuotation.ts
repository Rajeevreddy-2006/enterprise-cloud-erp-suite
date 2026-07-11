import { useQuery } from "@tanstack/react-query";

import quotationService from "@/services/quotation.service";

export function useReviewQuotation(
    token: string
) {

    return useQuery({

        queryKey: [
            "quotation-review",
            token,
        ],

        queryFn: () =>
            quotationService.reviewQuotation(
                token
            ),

        enabled: !!token,

    });

}