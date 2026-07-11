import {

    useMutation

}

from "@tanstack/react-query";

import supplierService

from "@/services/supplier.service";

export function useDeleteSupplier() {

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            supplierService

                .deleteSupplier(

                    id

                )

    });

}