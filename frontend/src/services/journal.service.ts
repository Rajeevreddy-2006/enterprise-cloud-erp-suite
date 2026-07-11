import api from "./api";

import type {

    CreateJournalEntryDto,

    UpdateJournalEntryDto

} from "@/types/journal.types";

class JournalService {

    async getJournalEntries() {

        const response = await api.get(

            "/journal-entries"

        );

        return response.data;

    }

    async getJournalEntryById(

        id: string

    ) {

        const response = await api.get(

            `/journal-entries/${id}`

        );

        return response.data;

    }

    async createJournalEntry(

        data: CreateJournalEntryDto

    ) {

        const response = await api.post(

            "/journal-entries",

            data

        );

        return response.data;

    }

    async updateJournalEntry(

        id: string,

        data: UpdateJournalEntryDto

    ) {

        const response = await api.put(

            `/journal-entries/${id}`,

            data

        );

        return response.data;

    }

    async deleteJournalEntry(

        id: string

    ) {

        const response = await api.delete(

            `/journal-entries/${id}`

        );

        return response.data;

    }

}

export default new JournalService();