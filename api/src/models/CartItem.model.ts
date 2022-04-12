import { Decimal } from "@prisma/client/runtime";
import PrismaException from "../exceptions/PrismaException";
import ICartItem from "../types/ICartItem";
import Cart from "./Cart.model";
import Model from "./Model";

class CartItem extends Model {
    private cartId: string;
    private productId: string;
    private quantity: number;
    constructor({ cartId, productId, quantity }: ICartItem) {
        super();
        this.productId = productId;
        this.cartId = cartId;
        this.quantity = quantity;
    }
    public async create() {
        const prisma = CartItem.getPrisma();
        const hasItem = await CartItem.getItemByproductId(this.productId, this.cartId);
        if (hasItem.length != 0) {
            this.quantity += hasItem[0].quantity;
            const removedCartItem = await CartItem.removeItem(hasItem[0].id);
            const price = removedCartItem.product.price.mul(removedCartItem.quantity) as Decimal;
            await Cart.updateOverallPrice(price.mul(-1), removedCartItem.cartId);
        }
        const item = await prisma.cartItem
            .create({
                data: {
                    productId: this.productId,
                    cartId: this.cartId,
                    cart: {
                        create: { cartId: this.cartId },
                    },
                    quantity: this.quantity,
                },
                include: { product: { select: { price: true } } },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Item");
            });
        return item;
    }
    public static async getItemByproductId(productId: string, cartId: string) {
        const prisma = CartItem.getPrisma();
        const item = await prisma.cartItem
            .findMany({
                where: { productId, cartId },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Item");
            });
        return item;
    }
    public static async getItemQuantity(id: string) {
        const prisma = CartItem.getPrisma();
        const cartItem = await prisma.cartItem
            .findUnique({ where: { id }, select: { quantity: true } })
            .catch((err) => {
                throw PrismaException.createException(err, "Item");
            });
        return cartItem?.quantity;
    }
    public static async removeItem(id: string) {
        const prisma = CartItem.getPrisma();
        const removedItem = await prisma.cartItem
            .delete({ where: { id }, include: { product: { select: { price: true } } } })
            .catch((err) => {
                throw PrismaException.createException(err, "Item");
            });
        return removedItem;
    }
    public static async edit(id: string, quantity: number) {
        const prisma = CartItem.getPrisma();
        const updatedItem = await prisma.cartItem
            .update({ where: { id }, data: { quantity }, include: { product: { select: { price: true } } } })
            .catch((err) => {
                throw PrismaException.createException(err, "Item");
            });
        return updatedItem;
    }
}

export default CartItem;
