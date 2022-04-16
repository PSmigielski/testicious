import { NextFunction, Request, Response } from "express";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import schemaValidator from "../middleware/schemaValidator";
import Discount from "../models/Discount.model";
import DiscountService from "../services/DiscountService";
import IDiscount from "../types/IDiscount";
import { Methods } from "../types/Methods";
import Roles from "../types/Roles";
import Controller from "./Controller";

class DiscountController extends Controller {
    constructor() {
        super();
    }
    path = "/discounts";
    routes = [
        {
            path: "",
            method: Methods.POST,
            handler: this.create,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/discount.schema.json")],
        },
        {
            path: "",
            method: Methods.GET,
            handler: this.fetchAll,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN)],
        },
        {
            path: "/:discountId",
            method: Methods.PUT,
            handler: this.edit,
            localMiddleware: [
                checkJwt,
                checkRole(Roles.ADMIN),
                checkUuid("discountId"),
                schemaValidator("/../../schemas/discountUpdate.schema.json"),
            ],
        },
        {
            path: "/:discountId",
            method: Methods.DELETE,
            handler: this.remove,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN), checkUuid("discountId")],
        },
    ];
    public async create(req: Request, res: Response, next: NextFunction) {
        const data: IDiscount = req.body;
        const discount = await new DiscountService().create(data).catch(next);
        if (discount) {
            return res.status(201).json({ message: "discount has been created!", discount });
        }
    }
    public async fetchAll(req: Request, res: Response, next: NextFunction) {
        const discounts = await Discount.fetchAll().catch(next);
        if (discounts) {
            return res.status(200).json({ discounts });
        }
    }
    public async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.discountId;
        const removedDiscount = await Discount.remove(id).catch(next);
        if (removedDiscount) {
            return res.status(202).json({ message: "discount has been removed", removedDiscount });
        }
    }
    public async edit(req: Request, res: Response, next: NextFunction) {
        const id = req.params.discountId;
        const data: IDiscount = req.body;
        const updatedDiscount = await Discount.edit(id, data).catch(next);
        if (updatedDiscount) {
            return res.status(202).json({ message: "discount has been updated", updatedDiscount });
        }
    }
}

export default DiscountController;
