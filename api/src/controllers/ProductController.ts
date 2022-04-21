import { NextFunction, Request, Response } from "express";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import parameterPollutionMiddleware from "../middleware/parameterPollutionMiddleware";
import schemaValidator from "../middleware/schemaValidator";
import ProductService from "../services/ProductService";
import IProduct from "../types/IProduct";
import { Methods } from "../types/Methods";
import Roles from "../types/Roles";
import Controller from "./Controller";
import csrf from "csurf";

class ProductController extends Controller {
    path = "/products";
    routes = [
        {
            path: "/:categoryId",
            method: Methods.POST,
            handler: this.create,
            localMiddleware: [
                checkJwt,
                checkRole(Roles.ADMIN),
                checkUuid("categoryId"),
                schemaValidator("/../../schemas/product.schema.json"),
                csrf({ cookie: true }),
            ],
        },
        {
            path: "/:categoryId/:id",
            method: Methods.PUT,
            handler: this.update,
            localMiddleware: [
                checkJwt,
                checkRole(Roles.ADMIN),
                checkUuid(["categoryId", "id"]),
                schemaValidator("/../../schemas/productUpdate.schema.json"),
                csrf({ cookie: true }),
            ],
        },
        {
            path: "",
            method: Methods.GET,
            handler: this.fetch,
            localMiddleware: [parameterPollutionMiddleware(["name", "page", "limit"])],
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: this.remove,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN), checkUuid("id"), csrf({ cookie: true })],
        },
    ];
    public async create(req: Request, res: Response, next: NextFunction) {
        const data: IProduct = req.body;
        const categoryId = req.params.categoryId;
        const product = await new ProductService().create(data, categoryId).catch(next);
        if (product) {
            return res.status(201).json({ message: "Product has been added!", product });
        }
    }
    public async fetch(req: Request, res: Response, next: NextFunction) {
        const categoryName = req.query.name as string;
        const page = req.query?.page ? parseInt(req.query.page as string) : 0;
        const limit = req.query?.limit ? parseInt(req.query.limit as string) : 25;
        const products = await new ProductService().fetchProducts(categoryName, page, limit).catch(next);
        if (products) {
            return res.json(products);
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction) {
        const remove = await new ProductService().remove(req.params.id).catch(next);
        if (remove) {
            return res.status(201).json({ message: "Product has been removed!" });
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        const data: IProduct = req.body;
        const { id, categoryId } = req.params;
        const updatedProduct = await new ProductService().update(data, categoryId, id).catch(next);
        if (updatedProduct) {
            return res.status(202).json({ message: "Product has been updated!", updatedProduct: updatedProduct });
        }
    }
}

export default ProductController;
