import { useMutation, useQueryClient } from "@tanstack/react-query";
import salesOrderService from "@/services/salesOrder.service";

export function useUpdateSalesOrder() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({

            id,

            data

        }: {

            id: string;

            data: any;

        }) =>

            salesOrderService.updateSalesOrder(

                id,

                data

            ),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["sales-orders"]

            });

        }

    });

}