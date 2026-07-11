import {

    useMutation

}

from "@tanstack/react-query";

import supplierService

from "@/services/supplier.service";

export function useUpdateSupplier() {

    return useMutation({

        mutationFn: ({

            id,

            data

        }: {

            id: string;

            data: any;

        }) =>

            supplierService

                .updateSupplier(

                    id,

                    data

                )

    });

}