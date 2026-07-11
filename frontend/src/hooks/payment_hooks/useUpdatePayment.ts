import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import paymentService from "@/services/payment.service";

export function useUpdatePayment() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            {

                id,

                data

            }: {

                id: string;

                data: any;

            }

        ) =>

            paymentService.updatePayment(

                id,

                data

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["payments"]

            });

        }

    });

}