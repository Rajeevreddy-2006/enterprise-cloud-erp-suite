import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import purchaseOrderService from "@/services/purchase.service";

export const useUpdatePurchaseOrder = () => {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: any;
        }) =>
            purchaseOrderService.updatePurchaseOrder(
                id,
                data
            ),

        onSuccess() {

            queryClient.invalidateQueries({
                queryKey: ["purchaseOrders"],
            });

        },

    });

};