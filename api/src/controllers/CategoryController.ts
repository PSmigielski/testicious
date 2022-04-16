import { NextFunction, Request, Response } from "express";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import schemaValidator from "../middleware/schemaValidator";
import Category from "../models/Category.model";
import { Methods } from "../types/Methods";
import Roles from "../types/Roles";
import Controller from "./Controller";

class CategoryController extends Controller {
    constructor() {
        super();
    }
    path = "/categories";
    routes = [
        {
            path: "",
            method: Methods.POST,
            handler: this.create,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/category.schema.json")],
        },
        {
            path: "",
            method: Methods.GET,
            handler: this.showAll,
            localMiddleware: [],
        },
        {
            path: "/:id",
            method: Methods.PUT,
            handler: this.update,
            localMiddleware: [
                checkJwt,
                checkRole(Roles.ADMIN),
                checkUuid("id"),
                schemaValidator("/../../schemas/editCategory.schema.json"),
            ],
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: this.remove,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN), checkUuid("id")],
        },
    ];
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
