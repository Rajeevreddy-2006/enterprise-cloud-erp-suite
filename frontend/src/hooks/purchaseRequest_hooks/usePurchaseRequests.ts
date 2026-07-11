import { useQuery } from "@tanstack/react-query";

import purchaseRequestService from "@/services/purchaseRequest.service";

export function usePurchaseRequests() {

    return useQuery({

        queryKey: ["purchase-requests"],

        queryFn: () =>

            purchaseRequestService.getPurchaseRequests()

    });

}