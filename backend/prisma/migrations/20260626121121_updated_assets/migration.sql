/*
  Warnings:

  - A unique constraint covering the columns `[assetCode]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assetCode` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentValue` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `SalesOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssetCategory" AS ENUM ('COMPUTER', 'LAPTOP', 'MOBILE', 'FURNITURE', 'VEHICLE', 'MACHINERY', 'NETWORK_DEVICE', 'OTHER');

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "assetCode" TEXT NOT NULL,
ADD COLUMN     "category" "AssetCategory" NOT NULL,
ADD COLUMN     "currentValue" DECIMAL(12,2) NOT NULL;

-- AlterTable
ALTER TABLE "SalesOrder" ADD COLUMN     "totalAmount" DECIMAL(12,2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Asset_assetCode_key" ON "Asset"("assetCode");
