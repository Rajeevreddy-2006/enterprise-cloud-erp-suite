import {
    useMutation,
} from "@tanstack/react-query";

import invoiceService
    from "@/services/invoice.service";

export function useFailInvoice() {

    return useMutation({

        mutationFn:
            invoiceService.failInvoice,

    });

}