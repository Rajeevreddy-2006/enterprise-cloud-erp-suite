import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import paymentService from "@/services/payment.service";

export function useDeletePayment() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            paymentService.deletePayment(

                id

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["payments"]

            });

        }

    });

}