import { NextFunction, Request, Response } from "express";
import Category from "../models/Category.model";

class CategoryController {
    public async create(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;
        const category = await new Category(name).create().catch(next);
        if (category) {
            return res.status(201).json({ message: "Category has been created", category });
        }
    }
    public async showAll(req: Request, res: Response, next: NextFunction) {
        const categories = await Category.fetchAll().catch(next);
        if (categories) {
            return res.status(200).json({ categories });
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const category = await Category.remove(id).catch(next);
        if (category) {
            return res.status(202).json({ message: "Category has been removed", category });
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;
        const id = req.params.id;
        const category = await Category.edit(name, id).catch(next);
        if (category) {
            return res.status(202).json({ message: "Category has been updated", category });
        }
    }
}

export default CategoryController;
