import { NextFunction, Request, Response } from "express";
import checkJwt from "../middleware/checkJwt";
import checkUuid from "../middleware/checkUuid";
import CartItemService from "../services/CartItemService";
import { Methods } from "../types/Methods";
import Controller from "./Controller";

class CartItemController extends Controller {
    constructor() {
        super();
    }
    path = "/items";
    routes = [
        {
            path: "/:cartId/:productId",
            method: Methods.POST,
            handler: this.create,
            localMiddleware: [checkJwt, checkUuid(["cartId", "productId"])],
        },
        {
            path: "/:cartId/:itemId",
            method: Methods.DELETE,
            handler: this.remove,
            localMiddleware: [checkJwt, checkUuid(["cartId", "itemId"])],
        },
        {
            path: "/:cartId/:itemId",
            method: Methods.PUT,
            handler: this.edit,
            localMiddleware: [checkJwt, checkUuid(["cartId", "itemId"])],
        },
    ];
    public async create(req: Request, res: Response, next: NextFunction) {
        const { cartId, productId } = req.params;
        const quantity: number = parseInt(req.query.quantity as string);
        await CartItemService.validateQuantity(quantity).catch(next);
        const data = await new CartItemService().create(cartId, productId, req.user?.id, quantity).catch(next);
        if (data) {
            return res.status(200).json({ message: "Item has been added to cart", ...data });
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction) {
        const { itemId, cartId } = req.params;
        const data = await new CartItemService().remove(itemId, cartId, req.user?.id).catch(next);
        if (data) {
            return res.status(202).json({ message: "Item has been removed!", ...data });
        }
    }
    public async edit(req: Request, res: Response, next: NextFunction) {
        const { itemId, cartId } = req.params;
        const quantity: number = parseInt(req.query.quantity as string);
        await CartItemService.validateQuantity(quantity).catch(next);
        const data = await new CartItemService().edit(itemId, cartId, req.user?.id, quantity).catch(next);
        if (data) {
            return res.status(202).json({ message: "Item has been updated", ...data });
        }
    }
}

export default CartItemController;
