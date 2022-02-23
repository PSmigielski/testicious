import { NextFunction, Request, Response } from "express";
import Cart from "../models/Cart.model";

class CartController {
    public async create(req: Request, res: Response, next: NextFunction){
        const userId = req.user?.id;
        const cart = await new Cart(userId).create();
        if(cart){
            return res.status(201).json({
                message: "Cart has been created",
                cart
            })
        }
    }
}

export default CartController;