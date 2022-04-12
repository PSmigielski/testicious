import { NextFunction, Request, Response } from "express";
import Topping from "../models/Topping.model";

class ToppingController {
    public async create(req: Request, res: Response, next: NextFunction) {
        const data: ITopping = req.body;
        const topping = await new Topping(data).create().catch(next);
        if (topping) {
            return res.status(201).json({ message: "Topping has been added", topping });
        }
    }
    public async show(req: Request, res: Response, next: NextFunction) {
        const toppings = await Topping.fetchAllToppings().catch(next);
        if (toppings) {
            return res.status(200).json({ toppings });
        }
    }
    public async removeTopping(req: Request, res: Response, next: NextFunction) {
        const removedTopping = await Topping.removeTopping(req.params?.toppingId).catch(next);
        if (removedTopping) {
            return res.status(202).json({ message: "Topping has been removed", topping: removedTopping });
        }
    }
    public async editTopping(req: Request, res: Response, next: NextFunction) {
        const data: ITopping = req.body;
        const updatedTopping = await Topping.editTopping(req.params?.toppingId, data).catch(next);
        if (updatedTopping) {
            return res.status(202).json({ message: "Topping has been updated", topping: updatedTopping });
        }
    }
}

export default ToppingController;
