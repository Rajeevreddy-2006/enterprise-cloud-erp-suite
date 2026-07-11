import AppError from "../utils/AppError";
import journalRepository from "../repositories/journal.repository";
import {
    CreateJournalEntryDto,
    UpdateJournalEntryDto
} from "../types/journal.types";

class JournalService {
    async getAllJournalEntries() {
        return journalRepository.getAllJournalEntries();
    }

    async getJournalEntryById(id: string) {
        const journalEntry =
            await journalRepository.getJournalEntryById(id);
        if (!journalEntry) {
            throw new AppError(
                "Journal Entry not found",404
            );
        }
        return journalEntry;
    }

    async createJournalEntry(data: CreateJournalEntryDto) {
        if (data.debitAccountId === data.creditAccountId) {
            throw new AppError(
                "Debit and Credit accounts cannot be the same",400
            );
        }
        return journalRepository.createJournalEntry(
            data
        );
    }

    async updateJournalEntry(
        id: string,
        data: UpdateJournalEntryDto
    ) {
        await this.getJournalEntryById(id);
        if (
            data.debitAccountId &&
            data.creditAccountId &&
            data.debitAccountId ===
            data.creditAccountId
        ) {
            throw new AppError(
                "Debit and Credit accounts cannot be the same",400
            );
        }
        return journalRepository.updateJournalEntry(
            id,
            data
        );
    }

    async deleteJournalEntry(id: string) {
        await this.getJournalEntryById(id);
        return journalRepository.deleteJournalEntry(id);
    }
}

export default new JournalService();