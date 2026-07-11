/*
  Warnings:

  - Made the column `requestedById` on table `PurchaseRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tenantId` on table `PurchaseRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PurchaseRequest" DROP CONSTRAINT "PurchaseRequest_requestedById_fkey";

-- AlterTable
ALTER TABLE "PurchaseRequest" ALTER COLUMN "requestedById" SET NOT NULL,
ALTER COLUMN "tenantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PurchaseRequest" ADD CONSTRAINT "PurchaseRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
