import api from "./api";

class AssetService {

    async getAssets() {

        const res =
            await api.get(
                "/assets"
            );

        return res.data;

    }

    async getAsset(

        id: string

    ) {

        const res =
            await api.get(

                `/assets/${id}`

            );

        return res.data;

    }

    async createAsset(

        data: any

    ) {

        const res =
            await api.post(

                "/assets",

                data

            );

        return res.data;

    }

    async updateAsset(

        id: string,

        data: any

    ) {

        const res =
            await api.patch(

                `/assets/${id}`,

                data

            );

        return res.data;

    }

    async deleteAsset(

        id: string

    ) {

        const res =
            await api.delete(

                `/assets/${id}`

            );

        return res.data;

    }

    async assignAsset(

        data: any

    ) {

        const res =
            await api.post(

                "/assets/assign",

                data

            );

        return res.data;

    }

    async returnAsset(

        assignmentId: string

    ) {

        const res =
            await api.post(

                "/assets/return",

                {

                    assignmentId

                }

            );

        return res.data;

    }

    async employeeAssets(

        employeeId: string

    ) {

        const res =
            await api.get(

                `/assets/employee/${employeeId}`

            );

        return res.data;

    }

    async getAssetHistory(

        id: string

    ) {

        const res =

            await api.get(

                `/assets/${id}/history`

            );

        return res.data;

    }

    async getEmployeeAssets(

        employeeId: string

    ) {

        const res =

            await api.get(

                `/assets/employee/${employeeId}`

            );

        return res.data;

    }

}

export default new AssetService();