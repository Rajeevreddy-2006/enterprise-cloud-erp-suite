import { useQuery } from "@tanstack/react-query";
import quotationService from "@/services/quotation.service";

export function useQuotation(id: string) {
    return useQuery({
        queryKey: ["quotation", id],
        queryFn: () =>
            quotationService.getQuotationById(id),
        enabled: !!id,
    });
}