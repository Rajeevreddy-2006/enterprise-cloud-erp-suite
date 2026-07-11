import api from "./api";

import type {
    CreateAccountDto,
    UpdateAccountDto
} from "@/types/account.types";

class AccountService {

    async getAccounts() {

        const response =
            await api.get(
                "/accounts"
            );

        return response.data;

    }

    async getAccountById(

        id: string

    ) {

        const response =
            await api.get(
                `/accounts/${id}`
            );

        return response.data;

    }

    async createAccount(

        data: CreateAccountDto

    ) {

        const response =
            await api.post(
                "/accounts",
                data
            );

        return response.data;

    }

    async updateAccount(

        id: string,

        data: UpdateAccountDto

    ) {

        const response =
            await api.put(
                `/accounts/${id}`,
                data
            );

        return response.data;

    }

    async deleteAccount(

        id: string

    ) {

        const response =
            await api.delete(
                `/accounts/${id}`
            );

        return response.data;

    }

}

export default new AccountService();