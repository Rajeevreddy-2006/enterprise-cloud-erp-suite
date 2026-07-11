import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import salesOrderService
from "@/services/salesOrder.service";

export function useCompleteSalesOrder() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (id: string) =>

            salesOrderService.completeSalesOrder(id),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["sales-orders"]

            });

        }

    });

}