/*
  Warnings:

  - Made the column `buildingNumber` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "buildingNumber" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "street" SET NOT NULL;
