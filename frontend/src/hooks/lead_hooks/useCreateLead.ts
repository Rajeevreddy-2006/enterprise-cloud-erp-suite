import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/lead.service";

export const useCreateLead = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: service.createLead,
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["leads"]
            });
        }
    });
};