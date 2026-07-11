import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import salesOrderService
from "@/services/salesOrder.service";

export function useConfirmSalesOrder() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (id: string) =>

            salesOrderService.confirmSalesOrder(id),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["sales-orders"]

            });

        }

    });

}