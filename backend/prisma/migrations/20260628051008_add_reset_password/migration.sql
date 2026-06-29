-- AlterTable
ALTER TABLE "AssetAssignment" ADD COLUMN     "remarks" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiresAt" TIMESTAMP(3);
