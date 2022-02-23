import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import Item from "../models/Item.model";

class ItemController {
    public async create(req: Request, res: Response, next: NextFunction){
        const { cartId, pizzaId } = req.params;
        const quantity: number = parseInt(req.query.quantity as string);
        if(quantity <= 0 ||isNaN(quantity)){
            next(new ApiErrorException("invalid quantity format", 400));
        }      
        const item = await new Item({cartId, pizzaId, quantity}).create();
        if(item){
            return res.status(200).json({message: "Item has been added to cart"});
        }
    }
}

export default ItemController; 