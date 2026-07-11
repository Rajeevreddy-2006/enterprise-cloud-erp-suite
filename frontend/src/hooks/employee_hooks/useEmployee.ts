import { useQuery } from "@tanstack/react-query";

import employeeService
    from "@/services/employee.service";

export function useEmployee(
    id: string
) {
    return useQuery({
        queryKey: [
            "employee",
            id
        ],
        queryFn: async () => {
            const response =
                await employeeService.getEmployee(id);

            return response.data;
        },
        enabled: !!id
    });
}