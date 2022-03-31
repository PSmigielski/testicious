/*
  Warnings:

  - A unique constraint covering the columns `[imageUrl]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageUrl" VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_imageUrl_key" ON "Product"("imageUrl");
