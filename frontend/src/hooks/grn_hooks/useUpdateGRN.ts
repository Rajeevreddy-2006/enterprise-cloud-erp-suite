import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import grnService from "@/services/grn.service";

export function useUpdateGRN() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            {

                id,

                data

            }: {

                id: string;

                data: any;

            }

        ) =>

            grnService.updateGRN(

                id,

                data

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