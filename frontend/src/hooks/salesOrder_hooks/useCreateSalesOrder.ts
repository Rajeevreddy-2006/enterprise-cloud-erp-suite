import { useMutation, useQueryClient } from "@tanstack/react-query";
import salesOrderService from "@/services/salesOrder.service";

export function useCreateSalesOrder() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (data: any) =>
            salesOrderService.createSalesOrder(data),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["sales-orders"]

            });

        }

    });

}