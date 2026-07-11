import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/interaction.service";

export const useUpdateInteraction = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id,data }: { id: string; data: any; }) => service.updateInteraction(id,data),
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["interactions"]
            });
        }
    });
};