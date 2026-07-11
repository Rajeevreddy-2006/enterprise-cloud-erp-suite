import { useQuery } from "@tanstack/react-query";
import quotationService from "@/services/quotation.service";

export function useQuotations() {
    return useQuery({
        queryKey: ["quotations"],
        queryFn: () =>
            quotationService.getAllQuotations(),
    });
}