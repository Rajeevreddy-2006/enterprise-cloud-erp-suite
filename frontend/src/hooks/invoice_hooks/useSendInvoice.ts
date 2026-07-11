import {

    useMutation,

    useQueryClient,

} from "@tanstack/react-query";

import invoiceService from "@/services/invoice.service";

export function useSendInvoice() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            invoiceService.sendInvoice,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [
                    "invoices",
                ],

            });

        },

    });

}