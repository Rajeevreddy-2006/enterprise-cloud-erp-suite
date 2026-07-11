import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/tenant.service";

export const useCreateTenant = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: service.createTenant,
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["tenants"]
            });
        }
    });
};