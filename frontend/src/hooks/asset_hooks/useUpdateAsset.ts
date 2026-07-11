import {

    useMutation

}

from "@tanstack/react-query";

import assetService

from "@/services/asset.service";

export function useUpdateAsset(){

    return useMutation({

        mutationFn:({

            id,

            data

        }:any)=>

            assetService

            .updateAsset(

                id,

                data

            )

    });

}