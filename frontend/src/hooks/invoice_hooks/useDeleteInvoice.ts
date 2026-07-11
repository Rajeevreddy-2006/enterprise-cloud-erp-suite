import {

    useMutation,

    useQueryClient,

} from "@tanstack/react-query";

import invoiceService from "@/services/invoice.service";

export function useDeleteInvoice() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            invoiceService.deleteInvoice,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [
                    "invoices",
                ],

            });

        },

    });

}