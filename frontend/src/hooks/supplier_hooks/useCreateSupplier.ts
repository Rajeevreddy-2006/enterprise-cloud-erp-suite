import {

    useMutation

}

from "@tanstack/react-query";

import supplierService

from "@/services/supplier.service";

export function useCreateSupplier() {

    return useMutation({

        mutationFn: (

            data: any

        ) =>

            supplierService

                .createSupplier(

                    data

                )

    });

}