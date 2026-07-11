import { useMutation } from "@tanstack/react-query";

import customerInvitationService from "@/services/customerInvitation.service";

import type {
    CompleteCustomerRegistration,
} from "@/types/customerInvitation.types";

export function useCompleteCustomerRegistration() {
    return useMutation({
        mutationFn: ({
            token,
            data,
        }: {
            token: string;
            data: CompleteCustomerRegistration;
        }) =>
            customerInvitationService.completeRegistration(
                token,
                data
            ),
    });
}