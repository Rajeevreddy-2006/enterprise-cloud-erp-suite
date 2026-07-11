import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import grnService from "@/services/grn.service";

export function useDeleteGRN() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            grnService.deleteGRN(

                id

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [

                    "grns"

                ]

            });

        }

    });

}