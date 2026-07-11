import { useQuery } from "@tanstack/react-query";

import customerInvitationService from "@/services/customerInvitation.service";

export function useVerifyCustomerInvitation(token: string) {
    return useQuery({
        queryKey: [
            "customer-invitation",
            token,
        ],
        queryFn: () =>
            customerInvitationService.verifyInvitation(token),
        enabled: !!token,
        retry: false,
    });
}