import {

    useMutation

}

    from "@tanstack/react-query";

import assetService

    from "@/services/asset.service";

export function useDeleteAsset() {

    return useMutation({

        mutationFn:

            assetService

                .deleteAsset

    });

}