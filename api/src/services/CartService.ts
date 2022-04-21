import ApiErrorException from "../exceptions/ApiErrorException";
import Cart from "../models/Cart.model";

class CartService {
    public async create(userId: string) {
        if (await Cart.hasActiveCart(userId)) {
            throw new ApiErrorException("user has active cart already", 409);
        } else {
            const cart = await new Cart(userId).create().catch((err) => {
                throw err;
            });
            return cart;
        }
    }
    public async getItems(cartId: string, userId: string) {
        if (!(await Cart.isOwner(userId, cartId))) {
            throw new ApiErrorException("This cart does not belong to you!", 403);
        } else {
            const items = await Cart.getItems(cartId).catch((err) => {
                throw err;
            });
            const overallPrice = await Cart.getOverallPrice(cartId).catch((err) => {
                throw err;
            });
            return { items: items?.items, overallPrice };
        }
    }
}

export default CartService;
