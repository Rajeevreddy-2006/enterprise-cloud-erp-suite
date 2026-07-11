import { useQuery } from "@tanstack/react-query";
import inventoryService from "@/services/inventory.service";

export function useInventoryItems() {

    return useQuery({

        queryKey: ["inventory-items"],

        queryFn: () =>
            inventoryService.getInventoryItems()

    });

}