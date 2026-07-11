import {

    useQuery

}

    from "@tanstack/react-query";

import employeeService

    from "@/services/employee.service";


export function

    useEmployeeProfile(

        id: string

    ) {

    return useQuery({

        queryKey: [

            "profile",

            id

        ],

        queryFn: () =>

            employeeService.profile(

                id

            ),

        enabled: !!id

    });

}