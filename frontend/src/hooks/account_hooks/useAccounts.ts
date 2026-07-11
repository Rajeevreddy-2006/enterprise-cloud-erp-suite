import { useQuery } from "@tanstack/react-query";

import accountService from "@/services/account.service";

export function useAccounts() {

    return useQuery({

        queryKey: ["accounts"],

        queryFn: () =>

            accountService.getAccounts()

    });

}