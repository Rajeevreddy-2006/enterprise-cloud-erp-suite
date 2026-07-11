import {

    useMutation

}

from "@tanstack/react-query";

import customerService

from "@/services/customer.service";

export function useCreateCustomer() {

    return useMutation({

        mutationFn: (

            data: any

        ) =>

            customerService

                .createCustomer(

                    data

                )

    });

}