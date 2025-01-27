-- CreateTable
CREATE TABLE "TenantConfig" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwilioConfig" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "accountSID" TEXT NOT NULL,
    "authToken" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwilioConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantConfig_tenantId_key" ON "TenantConfig"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "TwilioConfig_tenantConfigId_key" ON "TwilioConfig"("tenantConfigId");

-- AddForeignKey
ALTER TABLE "TenantConfig" ADD CONSTRAINT "TenantConfig_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwilioConfig" ADD CONSTRAINT "TwilioConfig_tenantConfigId_fkey" FOREIGN KEY ("tenantConfigId") REFERENCES "TenantConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
