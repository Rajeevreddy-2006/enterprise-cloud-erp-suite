import { useMutation,useQueryClient } from "@tanstack/react-query";
import * as service from "@/services/opportunity.service";

export const useCreateOpportunity = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: service.createOpportunity,
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["opportunities"]
            });
        }
    });
};