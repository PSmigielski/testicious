/*
  Warnings:

  - You are about to drop the column `appliedDiscountId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `overallPriceAfterDiscount` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_appliedDiscountId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "appliedDiscountId",
DROP COLUMN "overallPriceAfterDiscount";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "appliedDiscountId" UUID;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_appliedDiscountId_fkey" FOREIGN KEY ("appliedDiscountId") REFERENCES "Discount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
