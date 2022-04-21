import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import parameterPollutionMiddleware from "../middleware/parameterPollutionMiddleware";
import schemaValidator from "../middleware/schemaValidator";
import Category from "../models/Category.model";
import CategoryService from "../services/CategoryService";
import { Methods } from "../types/Methods";
import Roles from "../types/Roles";
import Controller from "./Controller";
import csrf from "csurf";

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
            localMiddleware: [
                checkJwt,
                checkRole(Roles.ADMIN),
                schemaValidator("/../../schemas/category.schema.json"),
                csrf({ cookie: true }),
            ],
        },
        {
            path: "",
            method: Methods.GET,
            handler: this.showAll,
            localMiddleware: [parameterPollutionMiddleware(["page", "limit"])],
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
                csrf({ cookie: true }),
            ],
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: this.remove,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN), checkUuid("id"), csrf({ cookie: true })],
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
        const page = req.query?.page ? parseInt(req.query.page as string) : 0;
        const limit = req.query?.limit ? parseInt(req.query.limit as string) : 25;
        if (isNaN(page) || isNaN(limit)) {
            next(new ApiErrorException(`wrong ${isNaN(page) ? "page" : "limit"} format`, 400));
        }
        const categories = await new CategoryService().showAll(page, limit).catch(next);
        if (categories) {
            return res.status(200).json(categories);
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
