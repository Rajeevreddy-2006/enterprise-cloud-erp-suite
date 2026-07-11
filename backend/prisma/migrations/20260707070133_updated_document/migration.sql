-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DocumentCategory" ADD VALUE 'AADHAR';
ALTER TYPE "DocumentCategory" ADD VALUE 'PAN';
ALTER TYPE "DocumentCategory" ADD VALUE 'PASSPORT';
ALTER TYPE "DocumentCategory" ADD VALUE 'RESUME';
ALTER TYPE "DocumentCategory" ADD VALUE 'CERTIFICATE';

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "employeeId" TEXT;

-- CreateIndex
CREATE INDEX "Document_employeeId_idx" ON "Document"("employeeId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
