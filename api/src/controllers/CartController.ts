import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import Cart from "../models/Cart.model";

class CartController {
    public async create(req: Request, res: Response, next: NextFunction) {
        const userId = req.user?.id;
        const cart = await new Cart(userId).create().catch(next);
        if (cart) {
            return res.status(201).json({
                message: "Cart has been created",
                cart,
            });
        }
    }
    public async getItems(req: Request, res: Response, next: NextFunction) {
        const { cartId } = req.params;
        if (!(await Cart.isOwner(req.user?.id, cartId))) {
            return next(new ApiErrorException("This cart does not belong to you!", 403));
        } else {
            const items = await Cart.getItems(cartId).catch(next);
            const overallPrice = await Cart.getOverallPrice(cartId).catch(next);
            if (items) {
                return res.status(200).json({ items: items.items, overallPrice });
            }
        }
    }
}

export default CartController;
