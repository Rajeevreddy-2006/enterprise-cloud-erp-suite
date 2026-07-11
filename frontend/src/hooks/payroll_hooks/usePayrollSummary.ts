import { useQuery }

    from "@tanstack/react-query";

import payrollService

    from "@/services/payroll.service";

export function usePayrollSummary(

    employeeId: string,

    month: number,

    year: number

) {

    return useQuery({

        queryKey: [

            "payroll-summary",

            employeeId,

            month,

            year

        ],

        queryFn: async () => {

            const response =

                await payrollService
                    .getPayrollSummary(

                        employeeId,

                        month,

                        year

                    );

            return response.data;

        }

    });

}