import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import stockMovementService from "@/services/stockMovement.service";

export function useCreateStockMovement() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:

            stockMovementService.createStockMovement,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [

                    "stock-movements"

                ]

            });

        }

    });

}