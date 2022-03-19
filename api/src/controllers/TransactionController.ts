import { NextFunction, Request, Response } from "express";
import Cart from "../models/Cart.model";
import Transaction from "../models/Transaction.model";

class TransactionConroller{
    public async create(req: Request, res: Response, next: NextFunction){
        const {cartId} = req.params;
        const userId = req.user?.id;
        const discountCode = req.query.code as string | undefined;
        const transaction = await new Transaction(cartId,userId,discountCode).create().catch(next);
        if(transaction){
            await Cart.archivise(transaction.cartId).catch(next)
            const cart = await new Cart(userId).create().catch(next);
            res.status(201).json({message: "Transaction has been completed!", transaction, cart})
        }
    }
    public async show(req: Request, res: Response, next: NextFunction){
        const { transactionId } = req.params;
        const transaction = await Transaction.show(transactionId).catch(next);
        if(transaction){
            return res.status(200).json(transaction);
        }
    }  
}

export default TransactionConroller;