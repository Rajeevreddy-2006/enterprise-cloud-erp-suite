-- AlterEnum
ALTER TYPE "InvoiceStatus" ADD VALUE 'FAILED';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "declinedAt" TIMESTAMP(3);
