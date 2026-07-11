import { useQuery } from "@tanstack/react-query";
import salesOrderService from "@/services/salesOrder.service";

export function useSalesOrders() {

    return useQuery({

        queryKey: ["sales-orders"],

        queryFn: () =>
            salesOrderService.getSalesOrders()

    });

}