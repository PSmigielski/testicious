/*
  Warnings:

  - Added the required column `appliedDiscountId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "appliedDiscountId" UUID NOT NULL,
ADD COLUMN     "overallPriceAfterDiscount" MONEY;

-- CreateTable
CREATE TABLE "Discount" (
    "id" UUID NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "precent" INTEGER NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Discount_code_key" ON "Discount"("code");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_appliedDiscountId_fkey" FOREIGN KEY ("appliedDiscountId") REFERENCES "Discount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
