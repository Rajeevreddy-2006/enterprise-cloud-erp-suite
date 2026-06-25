import prisma from "../config/database";
import { CreateTimeEntryDto, UpdateTimeEntryDto, } from "../types/timeEntry.types";

class TimeEntryRepository {

  async getAllTimeEntries() {
    return prisma.timeEntry.findMany({
      include: { employee: true, project: true, task: true, },
    });
  }

  async getTimeEntryById(id: string) {
    return prisma.timeEntry.findUnique({
      where: { id },
      include: { employee: true, project: true, task: true, },
    });
  }

  async createTimeEntry(data: CreateTimeEntryDto) {
    return prisma.timeEntry.create({data,});
  }

  async updateTimeEntry(id: string,data: UpdateTimeEntryDto) {
    return prisma.timeEntry.update({
      where: { id },
      data,
    });
  }

  async deleteTimeEntry(id: string) {
    return prisma.timeEntry.delete({
      where: { id },
    });
  }
}

export default new TimeEntryRepository();