import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import purchaseRequestService from "@/services/purchaseRequest.service";

export function useApprovePurchaseRequest() {

    const queryClient =

        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            purchaseRequestService.approvePurchaseRequest(

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