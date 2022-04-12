import { NextFunction, Request, Response } from "express";
import Product from "../models/Product.model";
import IProduct from "../types/IProduct";

class ProductController {
    public async create(req: Request, res: Response, next: NextFunction) {
        const data: IProduct = req.body;
        const categoryId = req.params.categoryId;
        const product = await new Product(data, categoryId).create().catch(next);
        if (product) {
            return res.status(201).json({ message: "Product has been added!", product });
        }
    }
    public async fetch(req: Request, res: Response, next: NextFunction) {
        const categoryName = req.query.name as string;
        const products = await Product.fetchProducts(categoryName).catch(next);
        if (products) {
            return res.json(products);
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction) {
        const remove = await Product.removeProduct(req.params.id).catch(next);
        if (remove) {
            return res.status(201).json({ message: "Product has been removed!" });
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        const data: IProduct = req.body;
        const { id, categoryId } = req.params;
        const updatedProdcut = await Product.updateProduct(data, categoryId, id).catch(next);
        if (updatedProdcut) {
            return res.status(202).json({ message: "Product has been updated!", updatedProdcut });
        }
    }
}

export default ProductController;
