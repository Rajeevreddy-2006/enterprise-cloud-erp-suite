import { useQuery } from "@tanstack/react-query";

import purchaseOrderService from "@/services/purchase.service";

export function usePurchaseOrders() {

    return useQuery({

        queryKey: ["purchase-orders"],

        queryFn: () =>

            purchaseOrderService.getPurchaseOrders()

    });

}