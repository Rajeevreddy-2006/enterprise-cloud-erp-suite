-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RoleType" ADD VALUE 'MANAGER';
ALTER TYPE "RoleType" ADD VALUE 'FINANCE_MANAGER';
ALTER TYPE "RoleType" ADD VALUE 'PROCUREMENT_MANAGER';
ALTER TYPE "RoleType" ADD VALUE 'INVENTORY_MANAGER';
ALTER TYPE "RoleType" ADD VALUE 'SALES_MANAGER';
ALTER TYPE "RoleType" ADD VALUE 'SALES_EXECUTIVE';
