import { useQuery }

    from

    "@tanstack/react-query";

import payrollService

    from "@/services/payroll.service";

export function useEmployeePayroll(

    id: string

) {

    return useQuery({

        queryKey: [

            "employee-payroll",

            id

        ],

        queryFn: async () => {

            const res =

                await payrollService

                    .employeePayrolls(

                        id

                    );

            return res.data;

        }

    });

}