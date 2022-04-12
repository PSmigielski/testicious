import { Decimal } from "@prisma/client/runtime";
import ApiErrorException from "../exceptions/ApiErrorException";
import PrismaException from "../exceptions/PrismaException";
import ITransactionWithoutUserData from "../types/ITransactionWithoutUser";
import Cart from "./Cart.model";
import Discount from "./Discount.model";
import Model from "./Model";
class Transaction extends Model {
    private cartId: string;
    private userId: string;
    private discountCode?: string;
    constructor(cartId: string, userId: string, discountCode?: string) {
        super();
        this.cartId = cartId;
        this.userId = userId;
        this.discountCode = discountCode;
    }
    public async create() {
        const prisma = Transaction.getPrisma();
        if (await Cart.isOwner(this.userId, this.cartId)) {
            const cart = await Cart.getItems(this.cartId);
            if (cart?.items.length == 0) {
                throw new ApiErrorException("At least one item in cart required", 400);
            }
            if (this.discountCode) {
                const discount = await Discount.getDiscountByCode(this.discountCode);
                if (!Discount.isValid(discount?.id as string)) {
                    throw new ApiErrorException("This discount is expired", 404);
                }
                const overallPrice = (await Cart.getOverallPrice(this.cartId)) as Decimal;
                const newPrice = overallPrice
                    .mul(1 - (await Discount.getDiscountPrecent(discount?.id as string)) / 100)
                    .sub(overallPrice)
                    .abs();
                await Cart.updateOverallPrice(newPrice.mul(-1), this.cartId);
                const transaction = await prisma.transaction
                    .create({
                        data: {
                            cartId: this.cartId,
                            userId: this.userId,
                            appliedDiscountId: discount?.id,
                        },
                        select: {
                            id: true,
                            cartId: true,
                            appliedDiscount: {
                                select: {
                                    code: true,
                                    precent: true,
                                },
                            },
                            cart: {
                                select: {
                                    overallPrice: true,
                                    items: {
                                        select: {
                                            cartItem: {
                                                select: {
                                                    quantity: true,
                                                    product: {
                                                        select: {
                                                            id: true,
                                                            name: true,
                                                            price: true,
                                                            imageUrl: true,
                                                            category: {
                                                                select: {
                                                                    name: true,
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    })
                    .catch((err) => {
                        throw PrismaException.createException(err, "Transaction");
                    });
                return transaction;
            } else {
                const transaction = await prisma.transaction
                    .create({
                        data: {
                            cartId: this.cartId,
                            userId: this.userId,
                        },
                        select: {
                            id: true,
                            cartId: true,
                            cart: {
                                select: {
                                    overallPrice: true,
                                    items: {
                                        select: {
                                            cartItem: {
                                                select: {
                                                    quantity: true,
                                                    product: {
                                                        select: {
                                                            id: true,
                                                            name: true,
                                                            price: true,
                                                            imageUrl: true,
                                                            category: {
                                                                select: {
                                                                    name: true,
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    })
                    .catch((err) => {
                        throw PrismaException.createException(err, "Transaction");
                    });
                return transaction;
            }
        } else {
            throw new ApiErrorException("You can't create transaction with not yours cart");
        }
    }
    public static async createWithoutUser(data: ITransactionWithoutUserData, cartId: string) {
        const prisma = Transaction.getPrisma();
        const transaction = await prisma.transaction.create({
            data: {
                city: data.clientData.city,
                buildingNumber: data.clientData.buildingNumber,
                homeNumber: data.clientData.homeNumber,
                email: data.clientData.email,
                name: data.clientData.name,
                surname: data.clientData.surname,
                street: data.clientData.phoneNumber,
                phoneNumber: data.clientData.phoneNumber,
                cartId,
            },
            select: {
                id: true,
                cartId: true,
                appliedDiscount: true,
                email: true,
                street: true,
                homeNumber: true,
                buildingNumber: true,
                city: true,
                phoneNumber: true,
                name: true,
                surname: true,
                cart: {
                    select: {
                        overallPrice: true,
                        items: {
                            select: {
                                cartItem: {
                                    select: {
                                        quantity: true,
                                        product: {
                                            select: {
                                                id: true,
                                                name: true,
                                                price: true,
                                                imageUrl: true,
                                                category: {
                                                    select: {
                                                        name: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return transaction;
    }
    public static async show(id: string) {
        const prisma = Transaction.getPrisma();
        const transaction = await prisma.transaction
            .findUnique({
                where: { id },
                select: {
                    id: true,
                    cartId: true,
                    appliedDiscount: true,
                    cart: {
                        select: {
                            overallPrice: true,
                            items: {
                                select: {
                                    cartItem: {
                                        select: {
                                            quantity: true,
                                            product: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                    price: true,
                                                    imageUrl: true,
                                                    category: {
                                                        select: {
                                                            name: true,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Transaction");
            });
        return transaction;
    }
    public static async isOwner(userId: string, id: string) {
        const prisma = Transaction.getPrisma();
        const transaction = await prisma.transaction
            .findUnique({ where: { id }, select: { userId: true } })
            .catch((err) => {
                throw PrismaException.createException(err, "Transaction");
            });
        if (transaction?.userId == userId) {
            return true;
        } else {
            return false;
        }
    }
    public static async fetchAll(userId: string) {
        const prisma = Transaction.getPrisma();
        const transactions = await prisma.transaction
            .findMany({
                where: { userId },
                select: {
                    id: true,
                    cartId: true,
                    appliedDiscount: true,
                    cart: {
                        select: {
                            overallPrice: true,
                            items: {
                                select: {
                                    cartItem: {
                                        select: {
                                            quantity: true,
                                            product: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                    price: true,
                                                    imageUrl: true,
                                                    category: {
                                                        select: {
                                                            name: true,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Transaction");
            });
        return transactions;
    }
}

export default Transaction;
