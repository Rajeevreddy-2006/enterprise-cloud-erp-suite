/*
  Warnings:

  - You are about to drop the column `credit` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `debit` on the `JournalEntry` table. All the data in the column will be lost.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditAccountId` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debitAccountId` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEBIT', 'CREDIT');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "balance" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "type" "AccountType" NOT NULL;

-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "credit",
DROP COLUMN "debit",
ADD COLUMN     "amount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "creditAccountId" TEXT NOT NULL,
ADD COLUMN     "debitAccountId" TEXT NOT NULL,
ADD COLUMN     "tenantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "tenantId" TEXT NOT NULL,
ADD COLUMN     "type" "TransactionType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_debitAccountId_fkey" FOREIGN KEY ("debitAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_creditAccountId_fkey" FOREIGN KEY ("creditAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
