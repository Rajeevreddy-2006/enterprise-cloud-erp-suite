import {

    useMutation

}

    from "@tanstack/react-query";

import assetService

    from "@/services/asset.service";

export function useReturnAsset() {

    return useMutation({

        mutationFn:

            assetService

                .returnAsset

    });

}