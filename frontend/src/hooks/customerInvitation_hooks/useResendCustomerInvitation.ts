import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import customerInvitationService
from "@/services/customerInvitation.service";

export function
useResendCustomerInvitation() {
    const queryClient =
        useQueryClient();
    return useMutation({
        mutationFn:
            customerInvitationService
                .resendInvitation,
        onSuccess() {
            queryClient
                .invalidateQueries({
                    queryKey: [
                        "customer-invitations"
                    ]
                });
        }
    });
}