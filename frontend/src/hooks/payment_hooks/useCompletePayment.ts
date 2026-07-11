import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import paymentService from "@/services/payment.service";

export function useCompletePayment() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (id: string) =>

            paymentService.completePayment(id),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["payments"]

            });

            queryClient.invalidateQueries({

                queryKey: ["invoices"]

            });

        }

    });

}