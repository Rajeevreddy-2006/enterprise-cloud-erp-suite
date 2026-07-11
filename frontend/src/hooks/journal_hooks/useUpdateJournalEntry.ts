import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

export function useUpdateJournalEntry() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (

            {

                id,

                data

            }: {

                id: string;

                data: any;

            }

        ) =>

            journalService.updateJournalEntry(

                id,

                data

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