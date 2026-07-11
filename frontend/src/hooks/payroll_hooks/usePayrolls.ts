import { useQuery }

    from

    "@tanstack/react-query";

import payrollService

    from "@/services/payroll.service";

export function usePayrolls() {

    return useQuery({

        queryKey: [

            "payrolls"

        ],

        queryFn: async () => {

            const res =

                await payrollService

                    .getPayrolls();

            return res.data;

        }

    });

}