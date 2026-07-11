import { useQuery } from "@tanstack/react-query";
import documentService from "@/services/document.service";

export function useEmployeeDocuments(employeeId: string) {
    return useQuery({
        queryKey: [
            "documents",
            employeeId
        ],
        queryFn: () => documentService
            .employeeDocuments(
                employeeId
            ),
        enabled: !!employeeId
    });
}