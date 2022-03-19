-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- CreateTable
CREATE TABLE "CartItemsInCart" (
    "cartItemId" UUID NOT NULL,
    "cartId" UUID NOT NULL,

    CONSTRAINT "CartItemsInCart_pkey" PRIMARY KEY ("cartItemId","cartId")
);

-- AddForeignKey
ALTER TABLE "CartItemsInCart" ADD CONSTRAINT "CartItemsInCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemsInCart" ADD CONSTRAINT "CartItemsInCart_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
