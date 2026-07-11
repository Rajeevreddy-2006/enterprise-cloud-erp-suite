import {

    useMutation

}

from "@tanstack/react-query";

import documentService

from "@/services/document.service";

export function useUploadDocument() {

    return useMutation({

        mutationFn: ({

            file,

            category,

            employeeId

        }: {

            file: File;

            category: string;

            employeeId: string;

        }) =>

            documentService.upload({

                file,

                category,

                employeeId

            })

    });

}