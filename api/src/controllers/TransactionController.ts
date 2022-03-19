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
            await Cart.archivise(transaction.cartId)
            const cart = await new Cart(userId).create().catch(next);
            res.status(201).json({message: "Transaction has been completed!", transaction, cart})
        }
    }
}

export default TransactionConroller;