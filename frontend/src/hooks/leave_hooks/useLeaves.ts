import { useQuery } from "@tanstack/react-query";
import leaveService from "@/services/leave.service";

export function useLeaves(){
    return useQuery({
        queryKey: [ "leaves" ],
        queryFn: leaveService.getLeaves
    });
}