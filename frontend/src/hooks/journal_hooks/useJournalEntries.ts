import { useQuery } from "@tanstack/react-query";

import journalService from "@/services/journal.service";

export function useJournalEntries() {

    return useQuery({

        queryKey: ["journal-entries"],

        queryFn: () =>

            journalService.getJournalEntries()

    });

}