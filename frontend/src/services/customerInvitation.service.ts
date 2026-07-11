import api from "./api";

import type {
    CustomerInvitation,
    InviteCustomer,
    CompleteCustomerRegistration,
} from "@/types/customerInvitation.types";

class CustomerInvitationService {

    async getAllInvitations(): Promise<CustomerInvitation[]> {
        const response = await api.get(
            "/customer-invitations"
        );

        return response.data.data;
    }

    async getInvitationById(id: string): Promise<CustomerInvitation> {
        const response = await api.get(
            `/customer-invitations/${id}`
        );

        return response.data.data;
    }

    async inviteCustomer(data: InviteCustomer) {
        const response = await api.post(
            "/customer-invitations",
            data
        );

        return response.data.data;
    }

    async resendInvitation(id: string) {
        const response = await api.post(
            `/customer-invitations/${id}/resend`
        );

        return response.data.data;
    }

    async deleteInvitation(id: string) {
        const response = await api.delete(
            `/customer-invitations/${id}`
        );

        return response.data.data;
    }

    async verifyInvitation(token: string) {
        const response = await api.get(
            `/customer-invitations/verify/${token}`
        );

        return response.data.data;
    }

    async completeRegistration(
        token: string,
        data: CompleteCustomerRegistration
    ) {
        const response = await api.post(
            `/customer-invitations/register/${token}`,
            data
        );

        return response.data.data;
    }
}

export default new CustomerInvitationService();