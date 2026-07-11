import {

    useQuery

}

    from "@tanstack/react-query";

import assetService

    from "@/services/asset.service";

export function useAssets() {

    return useQuery({

        queryKey: [

            "assets"

        ],

        queryFn: () =>

            assetService

                .getAssets()

    });

}