import { useQuery } from "@tanstack/react-query";

import stockMovementService from "@/services/stockMovement.service";

export function useStockMovements() {

    return useQuery({

        queryKey: ["stock-movements"],

        queryFn: () =>

            stockMovementService.getStockMovements()

    });

}