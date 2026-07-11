import { useQuery } from "@tanstack/react-query";
import * as service from "@/services/audit.service";

export const useAuditLogs = () => {
    return useQuery({
        queryKey: ["auditLogs"],
        queryFn: async () => {
            const { data } = await service.getAuditLogs();
            return data;
        }
    });
};