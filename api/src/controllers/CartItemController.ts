import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import Cart from "../models/Cart.model";
import CartItem from "../models/CartItem.model";

class CartItemController {
    public async create(req: Request, res: Response, next: NextFunction){
        const { cartId, productId } = req.params;
        if(!await Cart.checkStatus(cartId)){
            return next(new ApiErrorException("This cart is archivised", 403));
        }
        if(!await Cart.isOwner(req.user?.id, cartId)){
            return next(new ApiErrorException("This cart does not belong to you!", 403))
        }else{
            const quantity: number = parseInt(req.query.quantity as string);
            if(quantity <= 0 ||isNaN(quantity)){
                return next(new ApiErrorException("invalid quantity format", 400));
            } 
            const cartItem = await new CartItem({cartId, productId, quantity}).create().catch(next);
            if(cartItem){
                return res.status(200).json({message: "Item has been added to cart", cartItem});
            }
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction){
        const {itemId, cartId} = req.params;
        if(!await Cart.isOwner(req.user?.id, cartId)){
            return next(new ApiErrorException("This cart does not belong to you!", 403));
        } else {
            const removedCartItem = await CartItem.removeItem(itemId).catch(next);
            if(removedCartItem){
                return res.status(202).json({message: "Item has been removed!", removedCartItem})
            }
        }
    }
    public async edit(req: Request, res: Response, next: NextFunction){
        const {itemId, cartId} = req.params;
        if(!await Cart.isOwner(req.user?.id, cartId)){
            return next(new ApiErrorException("This cart does not belong to you!", 403));
        } else {
            const quantity: number = parseInt(req.query.quantity as string);
            if(quantity <= 0 ||isNaN(quantity)){
                return next(new ApiErrorException("invalid quantity format", 400));
            } 
            const updatedCartItem = await CartItem.edit(itemId, quantity).catch(next);
            if(updatedCartItem){
                return res.status(202).json({message: "Item has been updated", updatedCartItem});
            }
        }
    }
}

export default CartItemController; 