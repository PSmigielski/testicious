import { Decimal } from "@prisma/client/runtime";
import ApiErrorException from "../exceptions/ApiErrorException";
import Cart from "../models/Cart.model";
import { v4 as uuidv4 } from "uuid";
import Discount from "../models/Discount.model";
import Transaction from "../models/Transaction.model";
import MailerService from "./MailerService";
import User from "../models/User.model";
import ITransaction from "../types/ITransaction";
import ITransactionWithoutUserData from "../types/ITransactionWithoutUser";
import ICartItem from "../types/ICartItem";
import CartItem from "../models/CartItem.model";
import paginationUtil from "../util/paginationUtil";

class TransactionService {
    public async create(cartId: string, userId: string, discountCode?: string) {
        if (await Cart.isOwner(userId, cartId)) {
            const cart = await Cart.getItems(cartId);
            if (cart?.items.length == 0) {
                throw new ApiErrorException("At least one item in cart required", 400);
            }
            let transaction = {};
            if (discountCode) {
                const discount = await Discount.getDiscountByCode(discountCode);
                if (!Discount.isValid(discount?.id as string)) {
                    throw new ApiErrorException("This discount is expired", 404);
                }
                const overallPrice = (await Cart.getOverallPrice(cartId)) as Decimal;
                const newPrice = overallPrice
                    .mul(1 - (await Discount.getDiscountPrecent(discount?.id as string)) / 100)
                    .sub(overallPrice)
                    .abs();
                await Cart.updateOverallPrice(newPrice.mul(-1), cartId);
                transaction = await new Transaction(cartId, userId, discountCode).create();
            } else {
                transaction = await new Transaction(cartId, userId).create();
            }
            await Cart.archive(cartId).catch((err) => {
                throw err;
            });
            const user = await User.getUserById(userId).catch((err) => {
                throw err;
            });
            if (user) {
                MailerService.sendTransactionConfirmation(transaction as ITransaction, user.email);
            }
            const newCart = await new Cart(userId).create().catch((err) => {
                throw err;
            });
            return { transaction, cart: newCart };
        } else {
            throw new ApiErrorException("You can't create transaction with not yours cart");
        }
    }
    public async createWithoutUser(data: ITransactionWithoutUserData) {
        const cart = await Cart.createWithoutUser(uuidv4()).catch((err) => {
            throw err;
        });
        if (cart) {
            data.cart.items.forEach(async (item) => {
                const itemData: ICartItem = {
                    cartId: cart.id,
                    productId: item.product,
                    quantity: item.quantity,
                };
                const cartItem = await new CartItem(itemData).create().catch((err) => {
                    throw err;
                });
            });
            await Cart.updateOverallPrice(new Decimal(data.cart.overallPrice), cart.id);
            const transaction = await Transaction.createWithoutUser(data, cart.id).catch((err) => {
                throw err;
            });
            if (transaction) {
                MailerService.sendTransactionConfirmation(transaction, transaction.email as string);
                await Cart.archive(cart.id).catch((err) => {
                    throw err;
                });
                return transaction;
            }
        }
    }
    public async show(transactionId: string, userId: string) {
        if (!(await Transaction.isOwner(userId, transactionId))) {
            throw new ApiErrorException("This transaction is not yours", 403);
        }
        const transaction = await Transaction.show(transactionId).catch((err) => {
            throw err;
        });
        if (transaction) {
            return transaction;
        }
    }
    public async fetchAll(page: number, limit: number, userId: string) {
        const count = await Transaction.count(userId).catch((err) => {
            throw err;
        });
        const totalPages = Math.floor(count / limit);
        paginationUtil(page, limit, count);
        const transactions = await Transaction.fetchAll(userId).catch((err) => {
            throw err;
        });
        return {
            totalCount: count,
            currentCount: transactions.length,
            page,
            totalPages,
            transactions,
        };
    }
}

export default TransactionService;
