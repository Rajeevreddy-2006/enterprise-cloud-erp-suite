import { useMutation, useQueryClient } from "@tanstack/react-query";
import salesOrderService from "@/services/salesOrder.service";

export function useDeleteSalesOrder() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (id: string) =>
            salesOrderService.deleteSalesOrder(id),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["sales-orders"]

            });

        }

    });

}