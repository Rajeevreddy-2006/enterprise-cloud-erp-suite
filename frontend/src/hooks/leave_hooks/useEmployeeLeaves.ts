import {
    useQuery
} from "@tanstack/react-query";
import leaveService
    from "@/services/leave.service";

export function
    useEmployeeLeaves(
        id: string
    ) {
    return useQuery({
        queryKey: [
            "employee-leaves",
            id
        ],
        queryFn: async () => {
            const res =
                await leaveService
                    .getEmployeeLeaves(id);
            return res.data;
        }
    });
}