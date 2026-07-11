import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import purchaseRequestService from "@/services/purchaseRequest.service";

export function useUpdatePurchaseRequest() {

    const queryClient =

        useQueryClient();

    return useMutation({

        mutationFn: (

            {

                id,

                data

            }: {

                id: string;

                data: any;

            }

        ) =>

            purchaseRequestService.updatePurchaseRequest(

                id,

                data

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