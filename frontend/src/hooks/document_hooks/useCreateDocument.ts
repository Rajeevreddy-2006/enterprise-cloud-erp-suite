import {
    useMutation
} from "@tanstack/react-query";
import documentService from "@/services/document.service";

export function useCreateDocument() {
    return useMutation({
        mutationFn:
            documentService.create
    });
}