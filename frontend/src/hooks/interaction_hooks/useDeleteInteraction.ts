import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/interaction.service";

export const useDeleteInteraction = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: service.deleteInteraction,
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["interactions"]
            });
        }
    });
};