import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import customerInvitationService
from "@/services/customerInvitation.service";

export function
useCreateCustomerInvitation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:
            customerInvitationService
                .inviteCustomer,
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