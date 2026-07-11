import {

    useMutation

}

from "@tanstack/react-query";

import customerService

from "@/services/customer.service";

export function useDeleteCustomer() {

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            customerService

                .deleteCustomer(

                    id

                )

    });

}