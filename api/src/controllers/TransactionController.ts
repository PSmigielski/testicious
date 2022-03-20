import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import Cart from "../models/Cart.model";
import Transaction from "../models/Transaction.model";
import User from "../models/User.model";
import MailerService from "../services/MailerService";

class TransactionController{
    public async create(req: Request, res: Response, next: NextFunction){
        const {cartId} = req.params;
        const userId = req.user?.id;
        const discountCode = req.query.code as string | undefined;
        const transaction = await new Transaction(cartId,userId,discountCode).create().catch(next);
        if(transaction){
            await Cart.archive(transaction.cartId).catch(next)
            const user = await User.getUserById(userId).catch(next)
            if(user){
                MailerService.sendTransactionConfirmation(transaction, user.email);
            }
            const cart = await new Cart(userId).create().catch(next);
            res.status(201).json({message: "Transaction has been completed!", transaction, cart})
        }
    }
    public async show(req: Request, res: Response, next: NextFunction){
        const { transactionId } = req.params;
        if(await Transaction.isOwner(req.user?.id as string, transactionId)){
            const transaction = await Transaction.show(transactionId).catch(next);
            if(transaction){
                return res.status(200).json(transaction);
            }
        } else {
            return next(new ApiErrorException("This transaction is not yours", 403));
        }
    }
    public async fetchAll(req: Request, res: Response, next: NextFunction){
        const userId = req.user?.id as string;
        const transactions = await Transaction.fetchAll(userId);
        if( transactions){
            return res.status(200).json({transactions});
        }
    }
}

export default TransactionController;