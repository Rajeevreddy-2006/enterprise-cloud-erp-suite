import {

    useMutation

}

    from "@tanstack/react-query";

import assetService

    from "@/services/asset.service";

export function useAssignAsset() {

    return useMutation({

        mutationFn:

            assetService

                .assignAsset

    });

}