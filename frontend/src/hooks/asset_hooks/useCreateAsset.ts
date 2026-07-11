import {

    useMutation

}

    from "@tanstack/react-query";

import assetService

    from "@/services/asset.service";

export function useCreateAsset() {

    return useMutation({

        mutationFn:

            assetService

                .createAsset

    });

}