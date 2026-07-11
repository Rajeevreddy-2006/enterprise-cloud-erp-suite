import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/tenant.service";

export const useUpdateTenant = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any; }) => service.updateTenant(id,data),
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["tenants"]
            });
        }
    });
};