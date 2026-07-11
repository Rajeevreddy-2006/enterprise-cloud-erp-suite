import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import purchaseRequestService from "@/services/purchaseRequest.service";

export function useDeletePurchaseRequest() {

    const queryClient =

        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            purchaseRequestService.deletePurchaseRequest(

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