import { useQuery } from "@tanstack/react-query";
import * as service from "@/services/lead.service";

export const useLeads = () => {
    return useQuery({
        queryKey: ["leads"],
        queryFn: async () => {
            const { data } = await service.getLeads();
            return data;
        }
    });
};