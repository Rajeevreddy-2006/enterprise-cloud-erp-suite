import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import purchaseRequestService from "@/services/purchaseRequest.service";

export function useRejectPurchaseRequest() {

    const queryClient =

        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            purchaseRequestService.rejectPurchaseRequest(

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