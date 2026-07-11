import { useQuery } from "@tanstack/react-query";
import * as service from "@/services/interaction.service";

export const useInteractions = () => {
    return useQuery({
        queryKey: ["interactions"],
        queryFn: async () => {
            const { data } = await service.getInteractions();
            return data;
        }
    });
};