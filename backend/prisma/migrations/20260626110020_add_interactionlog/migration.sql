-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('CALL', 'EMAIL', 'MEETING', 'FOLLOW_UP', 'NOTE');

-- CreateTable
CREATE TABLE "InteractionLog" (
    "id" TEXT NOT NULL,
    "interactionType" "InteractionType" NOT NULL,
    "subject" TEXT NOT NULL,
    "notes" TEXT,
    "interactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,
    "leadId" TEXT,
    "opportunityId" TEXT,
    "employeeId" TEXT,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InteractionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InteractionLog_customerId_idx" ON "InteractionLog"("customerId");

-- CreateIndex
CREATE INDEX "InteractionLog_leadId_idx" ON "InteractionLog"("leadId");

-- CreateIndex
CREATE INDEX "InteractionLog_opportunityId_idx" ON "InteractionLog"("opportunityId");

-- CreateIndex
CREATE INDEX "InteractionLog_tenantId_idx" ON "InteractionLog"("tenantId");

-- AddForeignKey
ALTER TABLE "InteractionLog" ADD CONSTRAINT "InteractionLog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractionLog" ADD CONSTRAINT "InteractionLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractionLog" ADD CONSTRAINT "InteractionLog_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractionLog" ADD CONSTRAINT "InteractionLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractionLog" ADD CONSTRAINT "InteractionLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
