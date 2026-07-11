import { useQuery } from "@tanstack/react-query";

import expenseService from "@/services/expense.service";

export function useExpenses() {

    return useQuery({

        queryKey: ["expenses"],

        queryFn: () =>

            expenseService.getExpenses()

    });

}