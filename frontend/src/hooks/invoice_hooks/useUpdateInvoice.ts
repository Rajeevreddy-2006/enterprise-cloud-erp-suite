import {

    useMutation,

    useQueryClient,

} from "@tanstack/react-query";

import invoiceService from "@/services/invoice.service";

import type {

    UpdateInvoiceDto,

} from "@/types/invoice.types";

export function useUpdateInvoice() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            {

                id,

                data,

            }: {

                id: string;

                data: UpdateInvoiceDto;

            }

        ) =>
            invoiceService.updateInvoice(
                id,
                data
            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [
                    "invoices",
                ],

            });

        },

    });

}