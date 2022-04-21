import PrismaException from "../exceptions/PrismaException";
import ITransactionWithoutUserData from "../types/ITransactionWithoutUser";
import Model from "./Model";
class Transaction extends Model {
    private cartId: string;
    private userId: string;
    private discountId?: string;
    constructor(cartId: string, userId: string, discountId?: string) {
        super();
        this.cartId = cartId;
        this.userId = userId;
        this.discountId = discountId;
    }
    public async create() {
        if (this.discountId) {
            return await this.prisma.transaction
                .create({
                    data: {
                        cartId: this.cartId,
                        userId: this.userId,
                        appliedDiscountId: this.discountId,
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
        } else {
            return await this.prisma.transaction
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
        }
    }
    public static async createWithoutUser(data: ITransactionWithoutUserData, cartId: string) {
        const transaction = await this.prisma.transaction.create({
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
        const transaction = await this.prisma.transaction
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
    public static async count(userId: string) {
        return await this.prisma.transaction.count({ where: { userId } }).catch((err) => {
            throw PrismaException.createException(err, "Transaction");
        });
    }
    public static async isOwner(userId: string, id: string) {
        const transaction = await this.prisma.transaction
            .findUnique({ where: { id }, select: { userId: true } })
            .catch((err) => {
                throw PrismaException.createException(err, "Transaction");
            });
        return transaction?.userId === userId;
    }
    public static async fetchAll(userId: string) {
        const transactions = await this.prisma.transaction
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
