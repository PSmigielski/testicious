import { NextFunction, Request, Response } from "express";
import Discount from "../models/Discount.model";
import IDiscount from "../types/IDiscount";

class DiscountController{
    public async create(req: Request, res: Response, next: NextFunction){
        const data: IDiscount = req.body;
        const discount = await new Discount(data).create().catch(next);
        if(discount){
            return res.status(201).json({message: "discount has been created!", discount});
        }
    }
    public async fetchAll(req: Request, res: Response, next: NextFunction){
        const discounts = await Discount.fetchAll().catch(next)
        if(discounts){
            return res.status(200).json({discounts})
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction){
        const id = req.params.discountId;
        const removedDiscount = await Discount.remove(id).catch(next);
        if(removedDiscount){
            return res.status(202).json({message: "discount has been removed", removedDiscount});
        }
    }
    public async edit(req: Request, res: Response, next: NextFunction){
        const id = req.params.discountId;
        const data: IDiscount = req.body;
        const updatedDiscount = await Discount.edit(id,data).catch(next);
        if(updatedDiscount){
            return res.status(202).json({message: "discount has been updated", updatedDiscount});
        }
    }
}

export default DiscountController;