-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "supplierId" TEXT,
ALTER COLUMN "serialNumber" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Asset_supplierId_idx" ON "Asset"("supplierId");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
