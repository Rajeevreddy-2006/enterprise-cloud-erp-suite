import api from "./api";

import type {

    CreateStockMovementDto

} from "@/types/stockMovement.types";

class StockMovementService {

    async getStockMovements() {

        const response = await api.get(

            "/stock-movements"

        );

        return response.data;

    }

    async getStockMovementById(

        id: string

    ) {

        const response = await api.get(

            `/stock-movements/${id}`

        );

        return response.data;

    }

    async createStockMovement(

        data: CreateStockMovementDto

    ) {

        const response = await api.post(

            "/stock-movements",

            data

        );

        return response.data;

    }

    async deleteStockMovement(

        id: string

    ) {

        const response = await api.delete(

            `/stock-movements/${id}`

        );

        return response.data;

    }

}

export default new StockMovementService();