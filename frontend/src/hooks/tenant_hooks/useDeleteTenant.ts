import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import * as service from "@/services/tenant.service";

export const useDeleteTenant = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: service.deleteTenant,
        onSuccess() {
            qc.invalidateQueries({
                queryKey: ["tenants"]
            });
        }
    });
};