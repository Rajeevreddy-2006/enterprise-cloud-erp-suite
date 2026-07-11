import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import stockMovementService from "@/services/stockMovement.service";

export function useDeleteStockMovement() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            stockMovementService.deleteStockMovement(

                id

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [

                    "stock-movements"

                ]

            });

        }

    });

}