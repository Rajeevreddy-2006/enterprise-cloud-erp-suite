import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/lead.service";

export const useUpdateLead = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id,data }: {
            id: string;
            data: any;
        }) =>
            service.updateLead(
                id,
                data
            ),
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["leads"]
            });
        }
    });
};