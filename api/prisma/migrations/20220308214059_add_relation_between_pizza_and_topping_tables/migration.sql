/*
  Warnings:

  - You are about to drop the column `toppings` on the `Pizza` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pizza" DROP COLUMN "toppings";

-- CreateTable
CREATE TABLE "ToppingsOnPizzas" (
    "pizzaId" UUID NOT NULL,
    "toppingId" UUID NOT NULL,

    CONSTRAINT "ToppingsOnPizzas_pkey" PRIMARY KEY ("pizzaId","toppingId")
);

-- AddForeignKey
ALTER TABLE "ToppingsOnPizzas" ADD CONSTRAINT "ToppingsOnPizzas_toppingId_fkey" FOREIGN KEY ("toppingId") REFERENCES "Topping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToppingsOnPizzas" ADD CONSTRAINT "ToppingsOnPizzas_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;
