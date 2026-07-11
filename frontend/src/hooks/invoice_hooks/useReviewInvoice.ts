import { useQuery } from "@tanstack/react-query";

import invoiceService from "@/services/invoice.service";

export function useReviewInvoice(token: string) {

    return useQuery({

        queryKey: [
            "invoice-review",
            token,
        ],

        queryFn: () =>
            invoiceService.reviewInvoice(token),

        enabled: !!token,

    });

}