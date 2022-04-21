import { NextFunction, Request, Response } from "express";
import Transaction from "../models/Transaction.model";
import ITransactionWithoutUserData from "../types/ITransactionWithoutUser";
import Controller from "./Controller";
import { Methods } from "../types/Methods";
import checkJwt from "../middleware/checkJwt";
import checkUuid from "../middleware/checkUuid";
import schemaValidator from "../middleware/schemaValidator";
import TransactionService from "../services/TransactionService";
import parameterPollutionMiddleware from "../middleware/parameterPollutionMiddleware";

class TransactionController extends Controller {
    path = "/transactions";
    routes = [
        {
            path: "/:cartId",
            method: Methods.POST,
            handler: this.create,
            localMiddleware: [checkJwt, checkUuid("cartId"), parameterPollutionMiddleware("code")],
        },
        {
            path: "",
            method: Methods.POST,
            handler: this.createWithoutUser,
            localMiddleware: [schemaValidator("/../../schemas/transaction.schema.json")],
        },
        {
            path: "/:transactionId",
            method: Methods.GET,
            handler: this.show,
            localMiddleware: [checkJwt, checkUuid("transactionId")],
        },
        {
            path: "",
            method: Methods.GET,
            handler: this.fetchAll,
            localMiddleware: [checkJwt],
        },
    ];
    public async create(req: Request, res: Response, next: NextFunction) {
        const { cartId } = req.params;
        const userId = req.user?.id;
        const discountCode = req.query.code as string | undefined;
        const data = await new Transaction(cartId, userId, discountCode).create().catch(next);
        if (data) {
            res.status(201).json({ message: "Transaction has been completed!", ...data });
        }
    }
    public async createWithoutUser(req: Request, res: Response, next: NextFunction) {
        const data: ITransactionWithoutUserData = req.body;
        const transaction = await new TransactionService().createWithoutUser(data).catch(next);
        if (transaction) {
            return res.status(200).json({ message: "Transaction has been completed!", transaction });
        }
    }
    public async show(req: Request, res: Response, next: NextFunction) {
        const { transactionId } = req.params;
        const transaction = await new TransactionService().show(transactionId, req.user?.id).catch(next);
        if (transaction) {
            return res.status(200).json(transaction);
        }
    }
    public async fetchAll(req: Request, res: Response, next: NextFunction) {
        const userId = req.user?.id as string;
        const page = req.query?.page ? parseInt(req.query.page as string) : 0;
        const limit = req.query?.limit ? parseInt(req.query.limit as string) : 25;
        const transactions = await new TransactionService().fetchAll(page, limit, userId).catch(next);
        if (transactions) {
            return res.status(200).json({ transactions });
        }
    }
}

export default TransactionController;
