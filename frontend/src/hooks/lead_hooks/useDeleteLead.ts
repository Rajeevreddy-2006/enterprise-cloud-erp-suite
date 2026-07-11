import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/lead.service";

export const useDeleteLead = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: service.deleteLead,
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["leads"]
            });
        }
    });
};