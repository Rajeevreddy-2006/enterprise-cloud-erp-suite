import {

    useQuery

}

from "@tanstack/react-query";

import assetService

from "@/services/asset.service";

export function useEmployeeAssets(

    employeeId:string

){

    return useQuery({

        queryKey:[

            "employee-assets",

            employeeId

        ],

        queryFn:()=>

            assetService

            .getEmployeeAssets(

                employeeId

            ),

        enabled:

            !!employeeId

    });

}