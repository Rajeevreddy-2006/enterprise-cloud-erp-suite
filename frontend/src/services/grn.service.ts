import api from "./api";

import type {

    CreateGRNDto,

    UpdateGRNDto

} from "@/types/grn.types";

class GRNService {

    async getGRNs() {

        const response = await api.get(

            "/grns"

        );

        return response.data;

    }

    async getGRNById(

        id: string

    ) {

        const response = await api.get(

            `/grns/${id}`

        );

        return response.data;

    }

    async createGRN(

        data: CreateGRNDto

    ) {

        const response = await api.post(

            "/grns",

            data

        );

        return response.data;

    }

    async updateGRN(

        id: string,

        data: UpdateGRNDto

    ) {

        const response = await api.put(

            `/grns/${id}`,

            data

        );

        return response.data;

    }

    async deleteGRN(

        id: string

    ) {

        const response = await api.delete(

            `/grns/${id}`

        );

        return response.data;

    }

}

export default new GRNService();