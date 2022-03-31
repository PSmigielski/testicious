/*
  Warnings:

  - You are about to drop the column `streetNumber` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "streetNumber",
ADD COLUMN     "buildingNumber" INTEGER,
ADD COLUMN     "homeNumber" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "buildingNumber" INTEGER,
ADD COLUMN     "city" VARCHAR(100),
ADD COLUMN     "homeNumber" INTEGER,
ADD COLUMN     "street" VARCHAR(100);
