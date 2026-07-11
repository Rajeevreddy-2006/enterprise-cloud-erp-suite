import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import grnService from "@/services/grn.service";

export function useCreateGRN() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:

            grnService.createGRN,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [

                    "grns"

                ]

            });

        }

    });

}