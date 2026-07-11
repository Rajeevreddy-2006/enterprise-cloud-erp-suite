import {
    useQuery
} from "@tanstack/react-query";
import leaveService
    from "@/services/leave.service";

export function
    useLeaveBalance(
        id: string
    ) {
    return useQuery({
        queryKey: [
            "leave-balance",
            id
        ],
        queryFn: async () => {
            const res =
                await leaveService
                    .getLeaveBalance(id);
            return res.data;
        }
    });
}