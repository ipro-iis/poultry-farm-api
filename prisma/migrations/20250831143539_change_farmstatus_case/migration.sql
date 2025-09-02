/*
  Warnings:

  - The values [AVAILABLE,USING,CLOSED] on the enum `FarmStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."FarmStatus_new" AS ENUM ('available', 'using', 'closed');
ALTER TABLE "public"."Farm" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Farm" ALTER COLUMN "status" TYPE "public"."FarmStatus_new" USING ("status"::text::"public"."FarmStatus_new");
ALTER TYPE "public"."FarmStatus" RENAME TO "FarmStatus_old";
ALTER TYPE "public"."FarmStatus_new" RENAME TO "FarmStatus";
DROP TYPE "public"."FarmStatus_old";
ALTER TABLE "public"."Farm" ALTER COLUMN "status" SET DEFAULT 'available';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Farm" ALTER COLUMN "status" SET DEFAULT 'available';
