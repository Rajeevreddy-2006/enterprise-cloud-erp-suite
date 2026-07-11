import {

    useMutation

}

    from

    "@tanstack/react-query";

import payrollService

    from "@/services/payroll.service";

export function useMarkAsPaid() {

    return useMutation({

        mutationFn:

            (id: string) =>

                payrollService

                    .markAsPaid(

                        id

                    )

    });

}