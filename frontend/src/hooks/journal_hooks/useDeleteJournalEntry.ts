import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

export function useDeleteJournalEntry() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            id: string

        ) =>

            journalService.deleteJournalEntry(

                id

            ),

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: ["journal-entries"]

            });

            queryClient.invalidateQueries({

                queryKey: ["accounts"]

            });

            queryClient.invalidateQueries({

                queryKey: ["transactions"]

            });

        }

    });

}