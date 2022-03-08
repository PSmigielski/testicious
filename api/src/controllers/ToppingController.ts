import { NextFunction, Request, Response } from "express";
import Topping from "../models/Topping.model";

class ToppingController {
    public async create(req: Request, res: Response, next: NextFunction){
        const data: ITopping = req.body;
        const topping = await new Topping(data).create().catch(next);
        if(topping){
            return res.status(201).json({message: "Topping has been added", topping});
        }
    }
    public async show(req: Request, res: Response, next: NextFunction){
        const toppings = await Topping.fetchAllToppings().catch(next);
        if(toppings){
            return res.status(200).json({toppings})
        }
    }
}

export default ToppingController;