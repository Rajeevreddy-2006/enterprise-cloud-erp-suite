import { useQuery } from "@tanstack/react-query";

import grnService from "@/services/grn.service";

export function useGRNs() {

    return useQuery({

        queryKey: ["grns"],

        queryFn: () =>

            grnService.getGRNs()

    });

}