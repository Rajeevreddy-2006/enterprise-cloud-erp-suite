import {

    useQuery

}

from "@tanstack/react-query";

import assetService

from "@/services/asset.service";

export function useAssetHistory(

    assetId:string

){

    return useQuery({

        queryKey:[

            "asset-history",

            assetId

        ],

        queryFn:()=>

            assetService

                .getAssetHistory(

                    assetId

                ),

        enabled:

            !!assetId

    });

}