import { useMutation, useQueryClient } from "@tanstack/react-query";
import inventoryService from "@/services/inventory.service";

export function useDeleteInventoryItem() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (id: string) =>
            inventoryService.deleteInventoryItem(id),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["inventory-items"]

            });

        }

    });

}