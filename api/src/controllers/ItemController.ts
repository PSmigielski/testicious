import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import Cart from "../models/Cart.model";
import Item from "../models/Item.model";

class ItemController {
    public async create(req: Request, res: Response, next: NextFunction){
        const { cartId, pizzaId } = req.params;
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
            const item = await new Item({cartId, pizzaId, quantity}).create().catch(next);
            if(item){
                return res.status(200).json({message: "Item has been added to cart"});
            }
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction){
        const {itemId, cartId} = req.params;
        if(!await Cart.isOwner(req.user?.id, cartId)){
            return next(new ApiErrorException("This cart does not belong to you!", 403));
        } else {
            const removedItem = await Item.removeItem(itemId).catch(next);
            if(removedItem){
                return res.status(202).json({message: "Item has been removed!", removedItem})
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
            const updatedItem = await Item.edit(itemId, quantity).catch(next);
            if(updatedItem){
                return res.status(202).json({message: "Item has been updated", updatedItem});
            }
        }
    }
}

export default ItemController; 