import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/opportunity.service";

export const useDeleteOpportunity = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: service.deleteOpportunity,
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["opportunities"]
            });
        }
    });
};