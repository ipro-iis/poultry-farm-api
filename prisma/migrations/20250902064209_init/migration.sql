-- CreateEnum
CREATE TYPE "public"."FarmStatus" AS ENUM ('available', 'using', 'closed');

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Farm" (
    "id" TEXT NOT NULL,
    "farmNo" TEXT NOT NULL,
    "status" "public"."FarmStatus" NOT NULL DEFAULT 'available',
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DailyInput" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "farmId" TEXT NOT NULL,
    "inputDate" TIMESTAMP(3) NOT NULL,
    "dayIndex" INTEGER NOT NULL,
    "chicken" JSONB,
    "deathLoss" JSONB,
    "deathSale" JSONB,
    "discardSale" JSONB,
    "goodSale" JSONB,
    "chickenManure" JSONB,
    "pesticides" JSONB,
    "riceHusk" JSONB,
    "charcoal" JSONB,
    "sugar" JSONB,
    "food" JSONB,
    "medicine" JSONB,
    "strengthMedicine" JSONB,
    "vaccine" JSONB,
    "laborFee" JSONB,
    "other" JSONB,
    "remark" TEXT,

    CONSTRAINT "DailyInput_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_phoneNo_key" ON "public"."Company"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "Company_emailAddress_key" ON "public"."Company"("emailAddress");

-- AddForeignKey
ALTER TABLE "public"."Farm" ADD CONSTRAINT "Farm_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DailyInput" ADD CONSTRAINT "DailyInput_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "public"."Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
