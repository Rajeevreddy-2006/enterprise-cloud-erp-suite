import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import paymentService from "@/services/payment.service";

export function useFailPayment() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (id: string) =>

            paymentService.failPayment(id),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["payments"]

            });

        }

    });

}