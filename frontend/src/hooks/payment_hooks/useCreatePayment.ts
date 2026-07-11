import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import paymentService from "@/services/payment.service";

export function useCreatePayment() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: paymentService.createPayment,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["payments"]

            });

        }

    });

}