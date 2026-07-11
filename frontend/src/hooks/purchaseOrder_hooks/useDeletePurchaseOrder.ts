import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import purchaseOrderService from "@/services/purchase.service";

export function useDeletePurchaseOrder() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            purchaseOrderService.deletePurchaseOrder(id),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["purchase-orders"]

            });

        }

    });

}