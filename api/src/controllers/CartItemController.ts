import { Decimal } from "@prisma/client/runtime";
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
            if(quantity >= 1000){
                return next(new ApiErrorException("You can't buy so many things", 403))
            }
            const cartItem = await new CartItem({cartId, productId, quantity}).create().catch(next);
            if(cartItem){
                const price = cartItem.product.price.mul(cartItem.quantity) as Decimal
                const overallPrice = await Cart.updateOverallPrice(price, cartItem.cartId).catch(next)
                return res.status(200).json({message: "Item has been added to cart", cartItem, overallPrice});
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
                const price = removedCartItem.product.price.mul(removedCartItem.quantity) as Decimal
                const overallPrice = await Cart.updateOverallPrice(price.mul(-1), removedCartItem.cartId).catch(next)
                return res.status(202).json({message: "Item has been removed!", removedCartItem, overallPrice})
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
            const oldQuantity = await CartItem.getItemQuantity(itemId).catch(next) as number;
            const updatedCartItem = await CartItem.edit(itemId, quantity).catch(next);
            if(updatedCartItem){
                if(oldQuantity < quantity){
                    const price = updatedCartItem.product.price.mul(quantity) as Decimal
                    const oldprice = updatedCartItem.product.price.mul(oldQuantity) as Decimal;
                    const overallPrice = await Cart.updateOverallPrice(price.sub(oldprice).abs(), updatedCartItem.cartId).catch(next)
                    return res.status(202).json({message: "Item has been updated", updatedCartItem, overallPrice});
                }
                else{
                    const tmpQuantity = oldQuantity-quantity
                    const tmpPrice = updatedCartItem.product.price.mul(tmpQuantity) as Decimal;
                    const overallPrice = await Cart.updateOverallPrice(tmpPrice.mul(-1), updatedCartItem.cartId).catch(next)
                    return res.status(202).json({message: "Item has been updated", updatedCartItem, overallPrice});
                }
            }
        }
    }
}

export default CartItemController; 