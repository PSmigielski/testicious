import { NextFunction, Request, Response } from "express";
import Pizza from "../models/Pizza.model";
import IPizza from "../types/IPizza";

class PizzaController{
    public async create(req: Request, res: Response, next: NextFunction){
        const data: IPizza = req.body;
        const pizza = await new Pizza(data).create().catch(next);
        if(pizza){
            return res.status(201).json({message: "Pizza has been added!", pizza})
        }
    }
}

export default PizzaController;