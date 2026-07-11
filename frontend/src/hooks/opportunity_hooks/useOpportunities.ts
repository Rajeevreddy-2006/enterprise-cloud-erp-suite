import { useQuery } from "@tanstack/react-query";
import * as service from "@/services/opportunity.service";

export const useOpportunities = () => {
    return useQuery({
        queryKey: ["opportunities"],
        queryFn: async () => {
            const { data } = await service.getOpportunities();
            return data;
        }
    });
};