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
    public async fetch(req: Request, res: Response, next: NextFunction){
        const pizzas = await Pizza.fetchPizzas().catch(next);
        if(pizzas){
            return res.json(pizzas);
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction){
        const remove = await Pizza.removePizza(req.params.id).catch(next);
        if(remove){
            return res.status(201).json({message: "Pizza has been removed!"});
        }
    }
    public async update(req: Request, res: Response, next: NextFunction){
        const data: IPizza = req.body;
        const id = req.params.id;
        const updatedPizza = await Pizza.updatePizza(data, id).catch(next);
        if(updatedPizza){
            return res.status(202).json({message: "Pizza has been updated!", updatedPizza});
        }
    }
}

export default PizzaController;