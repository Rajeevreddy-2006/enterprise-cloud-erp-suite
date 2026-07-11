import {
    useQuery,
} from "@tanstack/react-query";

import customerInvitationService
from "@/services/customerInvitation.service";

export function useCustomerInvitations() {
    return useQuery({
        queryKey: [
            "customer-invitations"
        ],
        queryFn:
            customerInvitationService
                .getAllInvitations,
    });
}