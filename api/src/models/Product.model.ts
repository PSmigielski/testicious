import { Topping, Product as PrismaProduct } from "@prisma/client";
import ApiErrorException from "../exceptions/ApiErrorException";
import PrismaException from "../exceptions/PrismaException";
import FileService from "../services/FileService";
import IProduct from "../types/IProduct";
import Model from "./Model";

class Product extends Model {
    private name: string;
    private price: number;
    private categoryId: string;
    private imageUrl: string;
    private toppings: { toppingId: string }[] | undefined;
    constructor({ name, price, imageUrl, toppings }: IProduct, categoryId: string) {
        super();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.categoryId = categoryId;
        this.toppings = toppings?.map((el: string) => ({ toppingId: el }));
    }
    public async createWithoutToppings() {
        const product = await this.prisma.product
            .create({
                data: {
                    imageUrl: this.imageUrl,
                    name: this.name,
                    price: this.price,
                    categoryId: this.categoryId,
                },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Product");
            });
        return product;
    }
    public async create() {
        const product = await this.prisma.product
            .create({
                data: {
                    name: this.name,
                    price: this.price,
                    imageUrl: this.imageUrl,
                    categoryId: this.categoryId,
                    toppings: {
                        create: this.toppings,
                    },
                },
                include: { toppings: { select: { topping: true } } },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Product");
            });
        return product;
    }
    public static async count() {
        return await this.prisma.product.count().catch((err) => {
            throw PrismaException.createException(err, "Product");
        });
    }
    public static async fetchProducts(categoryName: string, limit: number, page: number) {
        const products = await this.prisma.product
            .findMany({
                take: limit,
                skip: page * limit,
                orderBy: { name: "asc" },
                where: {
                    category: {
                        name: categoryName,
                    },
                },
                include: { toppings: { select: { topping: true } } },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Product");
            });
        return products;
    }
    public static async removeProduct(id: string) {
        const removedProduct = await this.prisma.product.delete({ where: { id } }).catch((err) => {
            throw PrismaException.createException(err, "Product");
        });
        return removedProduct;
    }
    private static async updateToppings(toppings: string[], id: string) {
        await this.prisma.toppingsOnPizzas.deleteMany({ where: { productId: id } }).catch((err) => {
            throw PrismaException.createException(err, "toppingsOnPizzas");
        });
        for (const toppingId of toppings) {
            const topping = await this.prisma.topping.findMany({ where: { id: toppingId } }).catch((err) => {
                throw PrismaException.createException(err, "toppingsOnPizzas");
            });
            if (topping.length != 0) {
                await this.prisma.toppingsOnPizzas.create({ data: { toppingId, productId: id } }).catch((err) => {
                    throw PrismaException.createException(err, "toppingsOnPizzas");
                });
            } else {
                throw new ApiErrorException("Topping with this id does not exist!", 404);
            }
        }
    }
    public static async getProductImageUrl(id: string) {
        const product = await this.prisma.product
            .findUnique({ where: { id }, select: { imageUrl: true } })
            .catch((err) => {
                throw PrismaException.createException(err, "Product");
            });
        return product?.imageUrl;
    }
    public static async updateProduct({ name, price, imageUrl, toppings }: IProduct, categoryId: string, id: string) {
        if (toppings) {
            await Product.updateToppings(toppings, id);
        }
        const product = await this.prisma.product
            .update({
                data: {
                    name,
                    price,
                    categoryId,
                    imageUrl,
                },
                where: { id },
                include: {
                    toppings: {
                        select: {
                            topping: true,
                        },
                    },
                },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Product");
            });
        return product;
    }
}

export default Product;
