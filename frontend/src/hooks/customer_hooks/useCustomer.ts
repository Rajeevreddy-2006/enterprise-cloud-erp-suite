import {

    useQuery

}

from "@tanstack/react-query";

import customerService

from "@/services/customer.service";

export function useCustomer(

    id: string

) {

    return useQuery({

        queryKey: [

            "customer",

            id

        ],

        queryFn: () =>

            customerService

                .getCustomer(

                    id

                ),

        enabled:

            !!id

    });

}