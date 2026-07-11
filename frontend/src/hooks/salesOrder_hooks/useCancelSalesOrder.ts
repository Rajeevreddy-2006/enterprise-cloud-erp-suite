import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import salesOrderService
from "@/services/salesOrder.service";

export function useCancelSalesOrder() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (id: string) =>

            salesOrderService.cancelSalesOrder(id),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["sales-orders"]

            });

        }

    });

}