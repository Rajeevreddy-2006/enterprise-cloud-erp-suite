import { useQuery } from "@tanstack/react-query";

import supplierService
from "@/services/supplier.service";

export function useSupplier(

    id: string

) {

    return useQuery({

        queryKey: [

            "supplier",

            id

        ],

        queryFn: () =>

            supplierService

                .getSupplier(

                    id

                ),

        enabled:

            !!id

    });

}