import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/opportunity.service";

export const useUpdateOpportunity = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id,data }: {
            id: string;
            data: any;
        }) =>
            service.updateOpportunity(
                id,
                data
            ),
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["opportunities"]
            });
        }
    });
};