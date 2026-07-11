import prisma from "../config/database";
import {
    CreateJournalEntryDto,
    UpdateJournalEntryDto
} from "../types/journal.types";

class JournalRepository {
    async getAllJournalEntries() {
        return prisma.journalEntry.findMany({
            include: {
                debitAccount: true,
                creditAccount: true,
                transaction: true,
                tenant: true
            }
        });
    }

    async getJournalEntryById(id: string) {
        return prisma.journalEntry.findUnique({
            where: {
                id
            },
            include: {
                debitAccount: true,
                creditAccount: true,
                transaction: true,
                tenant: true
            }
        });
    }

    async createJournalEntry(data: CreateJournalEntryDto) {
        return prisma.journalEntry.create({
            data,
            include: {
                debitAccount: true,
                creditAccount: true,
                transaction: true,
                tenant: true
            }
        });
    }

    async updateJournalEntry(
        id: string,
        data: UpdateJournalEntryDto
    ) {
        return prisma.journalEntry.update({
            where: {
                id
            },
            data,
            include: {
                debitAccount: true,
                creditAccount: true,
                transaction: true,
                tenant: true
            }
        });
    }

    async deleteJournalEntry(id: string) {
        return prisma.journalEntry.delete({
            where: {
                id
            }
        });
    }
}

export default new JournalRepository();