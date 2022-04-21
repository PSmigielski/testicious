import { NextFunction, Request, Response } from "express";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import parameterPollutionMiddleware from "../middleware/parameterPollutionMiddleware";
import schemaValidator from "../middleware/schemaValidator";
import Topping from "../models/Topping.model";
import ToppingService from "../services/ToppingService";
import { Methods } from "../types/Methods";
import Roles from "../types/Roles";
import Controller from "./Controller";
import csrf from "csurf";
class ToppingController extends Controller {
    path = "/toppings";
    routes = [
        {
            path: "",
            method: Methods.POST,
            handler: this.create,
            localMiddleware: [
                checkJwt,
                checkRole(Roles.ADMIN),
                schemaValidator("/../../schemas/topping.schema.json"),
                csrf({ cookie: true }),
            ],
        },
        {
            path: "",
            method: Methods.GET,
            handler: this.show,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN), parameterPollutionMiddleware(["page", "limit"])],
        },
        {
            path: "/:toppingId",
            method: Methods.PUT,
            handler: this.editTopping,
            localMiddleware: [
                checkJwt,
                checkRole(Roles.ADMIN),
                checkUuid("toppingId"),
                schemaValidator("/../../schemas/editTopping.schema.json"),
                csrf({ cookie: true }),
            ],
        },
        {
            path: "/:toppingId",
            method: Methods.DELETE,
            handler: this.removeTopping,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN), checkUuid("toppingId"), csrf({ cookie: true })],
        },
    ];
    public async create(req: Request, res: Response, next: NextFunction) {
        const data: ITopping = req.body;
        const topping = await new Topping(data).create().catch(next);
        if (topping) {
            return res.status(201).json({ message: "Topping has been added", topping });
        }
    }
    public async show(req: Request, res: Response, next: NextFunction) {
        const page = req.query?.page ? parseInt(req.query.page as string) : 0;
        const limit = req.query?.limit ? parseInt(req.query.limit as string) : 25;
        const toppings = await new ToppingService().fetchAllToppings(page, limit).catch(next);
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
