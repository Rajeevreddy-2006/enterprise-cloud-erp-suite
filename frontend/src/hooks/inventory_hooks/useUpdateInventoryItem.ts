import { useMutation, useQueryClient } from "@tanstack/react-query";
import inventoryService from "@/services/inventory.service";

export function useUpdateInventoryItem() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({

            id,

            data

        }: {

            id: string;

            data: any;

        }) =>

            inventoryService.updateInventoryItem(

                id,

                data

            ),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["inventory-items"]

            });

        }

    });

}