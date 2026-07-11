import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import customerInvitationService
from "@/services/customerInvitation.service";

export function
useDeleteCustomerInvitation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:
            customerInvitationService
                .deleteInvitation,
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