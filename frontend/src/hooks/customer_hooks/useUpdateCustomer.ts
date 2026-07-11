import {

    useMutation

}

from "@tanstack/react-query";

import customerService

from "@/services/customer.service";

export function useUpdateCustomer() {

    return useMutation({

        mutationFn: ({

            id,

            data

        }: {

            id: string;

            data: any;

        }) =>

            customerService

                .updateCustomer(

                    id,

                    data

                )

    });

}