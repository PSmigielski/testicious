import { NextFunction, Request, Response } from "express";
import checkJwt from "../middleware/checkJwt";
import checkUuid from "../middleware/checkUuid";
import CartService from "../services/CartService";
import { Methods } from "../types/Methods";
import Controller from "./Controller";

class CartController extends Controller {
    constructor() {
        super();
    }
    path = "/carts";
    routes = [
        {
            path: "",
            method: Methods.POST,
            handler: this.create,
            localMiddleware: [checkJwt],
        },
        {
            path: "/:cartId",
            method: Methods.GET,
            handler: this.getItems,
            localMiddleware: [checkJwt, checkUuid("cartId")],
        },
    ];
    public async create(req: Request, res: Response, next: NextFunction) {
        const userId = req.user?.id;
        const cart = await new CartService().create(userId).catch(next); //new Cart(userId).create().catch(next);
        if (cart) {
            return res.status(201).json({
                message: "Cart has been created",
                cart,
            });
        }
    }
    public async getItems(req: Request, res: Response, next: NextFunction) {
        const { cartId } = req.params;
        const items = await new CartService().getItems(cartId, req.user?.id).catch(next);
        if (items) {
            return res.status(200).json(items);
        }
    }
}

export default CartController;
