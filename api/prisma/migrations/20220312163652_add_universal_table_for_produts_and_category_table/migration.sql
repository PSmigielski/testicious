/*
  Warnings:

  - The primary key for the `ToppingsOnPizzas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pizzaId` on the `ToppingsOnPizzas` table. All the data in the column will be lost.
  - You are about to drop the `Items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pizza` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `ToppingsOnPizzas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_pizzaId_fkey";

-- DropForeignKey
ALTER TABLE "ToppingsOnPizzas" DROP CONSTRAINT "ToppingsOnPizzas_pizzaId_fkey";

-- AlterTable
ALTER TABLE "ToppingsOnPizzas" DROP CONSTRAINT "ToppingsOnPizzas_pkey",
DROP COLUMN "pizzaId",
ADD COLUMN     "productId" UUID NOT NULL,
ADD CONSTRAINT "ToppingsOnPizzas_pkey" PRIMARY KEY ("productId", "toppingId");

-- DropTable
DROP TABLE "Items";

-- DropTable
DROP TABLE "Pizza";

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" UUID NOT NULL,
    "cartId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" UUID NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" MONEY NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToppingsOnPizzas" ADD CONSTRAINT "ToppingsOnPizzas_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
