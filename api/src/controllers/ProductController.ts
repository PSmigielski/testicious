import { NextFunction, Request, Response } from "express";
import Product from "../models/Product.model";
import IProduct from "../types/IProduct";

class ProductController{
    public async create(req: Request, res: Response, next: NextFunction){
        const data: IProduct = req.body;
        const pizza = await new Product(data).create().catch(next);
        if(pizza){
            return res.status(201).json({message: "Pizza has been added!", pizza})
        }
    }
    public async fetch(req: Request, res: Response, next: NextFunction){
        const categoryId = req.params.categoryId;
        const pizzas = await Product.fetchProducts(categoryId).catch(next);
        if(pizzas){
            return res.json(pizzas);
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction){
        const remove = await Product.removeProduct(req.params.id).catch(next);
        if(remove){
            return res.status(201).json({message: "Pizza has been removed!"});
        }
    }
    public async update(req: Request, res: Response, next: NextFunction){
        const data: IProduct = req.body;
        const id = req.params.id;
        const updatedPizza = await Product.updateProduct(data, id).catch(next);
        if(updatedPizza){
            return res.status(202).json({message: "Pizza has been updated!", updatedPizza});
        }
    }
}

export default ProductController;