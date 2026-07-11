import {

    useMutation

}

    from

    "@tanstack/react-query";

import payrollService

    from "@/services/payroll.service";

export function useCreatePayroll() {

    return useMutation({

        mutationFn:

            payrollService

                .createPayroll

    });

}