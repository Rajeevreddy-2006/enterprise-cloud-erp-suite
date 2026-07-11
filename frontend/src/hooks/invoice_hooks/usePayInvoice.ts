import { useMutation } from "@tanstack/react-query";

import invoiceService from "@/services/invoice.service";

export function usePayInvoice() {

    return useMutation({

        mutationFn: invoiceService.payInvoice,

    });

}