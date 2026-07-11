import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import purchaseRequestService from "@/services/purchaseRequest.service";

export function useCreatePurchaseRequest() {

    const queryClient =

        useQueryClient();

    return useMutation({

        mutationFn:

            purchaseRequestService.createPurchaseRequest,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [

                    "purchase-requests"

                ]

            });

        }

    });

}