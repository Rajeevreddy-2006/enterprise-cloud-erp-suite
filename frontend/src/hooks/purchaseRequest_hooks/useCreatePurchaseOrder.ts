import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import purchaseRequestService from "@/services/purchaseRequest.service";

export function useCreatePurchaseOrder() {

    const queryClient =

        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            purchaseRequestService.createPurchaseOrder(

                id

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [

                    "purchase-requests"

                ]

            });

        }

    });

}