import {
    useMutation
} from "@tanstack/react-query";
import documentService from "@/services/document.service";

export function useDeleteDocument() {
    return useMutation({
        mutationFn:
            documentService.delete
    });
}