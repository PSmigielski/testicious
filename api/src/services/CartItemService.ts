import { Decimal } from "@prisma/client/runtime";
import ApiErrorException from "../exceptions/ApiErrorException";
import Cart from "../models/Cart.model";
import CartItem from "../models/CartItem.model";

class CartItemService {
    public async create(cartId: string, productId: string, userId: string, quantity: number) {
        if (!(await Cart.checkStatus(cartId))) {
            throw new ApiErrorException("This cart is archivised", 403);
        }
        if (!(await Cart.isOwner(userId, cartId))) {
            throw new ApiErrorException("This cart does not belong to you!", 403);
        } else {
            const cartItem = await new CartItem({ cartId, productId, quantity }).create().catch((err) => {
                throw err;
            });
            if (cartItem) {
                const price = cartItem.product.price.mul(cartItem.quantity) as Decimal;
                const overallPrice = await Cart.updateOverallPrice(price, cartItem.cartId).catch((err) => {
                    throw err;
                });
                return { cartItem, overallPrice };
            }
        }
    }
    public async remove(itemId: string, cartId: string, userId: string) {
        if (!(await Cart.isOwner(userId, cartId))) {
            throw new ApiErrorException("This cart does not belong to you!", 403);
        } else {
            const removedCartItem = await CartItem.removeItem(itemId).catch((err) => {
                throw err;
            });
            if (removedCartItem) {
                const price = removedCartItem.product.price.mul(removedCartItem.quantity) as Decimal;
                const overallPrice = await Cart.updateOverallPrice(price.mul(-1), removedCartItem.cartId).catch(
                    (err) => {
                        throw err;
                    },
                );
                return { removedCartItem, overallPrice };
            }
        }
    }
    public async edit(itemId: string, cartId: string, userId: string, quantity: number) {
        if (!(await Cart.isOwner(userId, cartId))) {
            throw new ApiErrorException("This cart does not belong to you!", 403);
        } else {
            const oldQuantity = (await CartItem.getItemQuantity(itemId).catch((err) => {
                throw err;
            })) as number;
            const updatedCartItem = await CartItem.edit(itemId, quantity).catch((err) => {
                throw err;
            });
            if (updatedCartItem) {
                if (oldQuantity < quantity) {
                    const price = updatedCartItem.product.price.mul(quantity) as Decimal;
                    const oldPrice = updatedCartItem.product.price.mul(oldQuantity) as Decimal;
                    const overallPrice = await Cart.updateOverallPrice(
                        price.sub(oldPrice).abs(),
                        updatedCartItem.cartId,
                    ).catch((err) => {
                        throw err;
                    });
                    return { updatedCartItem, overallPrice };
                } else {
                    const tmpQuantity = oldQuantity - quantity;
                    const tmpPrice = updatedCartItem.product.price.mul(tmpQuantity) as Decimal;
                    const overallPrice = await Cart.updateOverallPrice(tmpPrice.mul(-1), updatedCartItem.cartId).catch(
                        (err) => {
                            throw err;
                        },
                    );
                    return { updatedCartItem, overallPrice };
                }
            }
        }
    }
    public static async validateQuantity(quantity: number) {
        if (quantity <= 0 || isNaN(quantity)) {
            throw new ApiErrorException("invalid quantity format", 400);
        }
        if (quantity >= 1000) {
            throw new ApiErrorException("You can't buy so many things", 403);
        }
    }
}

export default CartItemService;
