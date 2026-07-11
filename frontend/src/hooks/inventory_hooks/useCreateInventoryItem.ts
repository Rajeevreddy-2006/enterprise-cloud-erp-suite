import { useMutation, useQueryClient } from "@tanstack/react-query";
import inventoryService from "@/services/inventory.service";

export function useCreateInventoryItem() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (data: any) =>
            inventoryService.createInventoryItem(data),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["inventory-items"]

            });

        }

    });

}