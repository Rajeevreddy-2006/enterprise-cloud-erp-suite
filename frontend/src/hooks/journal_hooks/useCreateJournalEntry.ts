import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

export function useCreateJournalEntry() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            journalService.createJournalEntry,

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