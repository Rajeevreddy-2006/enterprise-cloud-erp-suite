import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/interaction.service";

export const useCreateInteraction = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: service.createInteraction,
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["interactions"]
            });
        }
    });
};