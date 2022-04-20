import Product from "../models/Product.model";
import IProduct from "../types/IProduct";
import { Topping, Product as PrismaProduct } from "@prisma/client";
import paginationUtil from "../util/paginationUtil";
import FileService from "./FileService";

class ProductService {
    public async create(data: IProduct, categoryId: string) {
        const product = new Product(data, categoryId);
        let result = {};
        if (data.toppings) {
            result = await product.create().catch((err) => {
                throw err;
            });
            result = this.formatDbData(result as PrismaProduct & { toppings: { topping: Topping }[] });
        } else {
            result = await product.createWithoutToppings().catch((err) => {
                throw err;
            });
        }
        return result;
    }
    private formatDbData(data: PrismaProduct & { toppings: { topping: Topping }[] }) {
        let flatObjArr = new Array<ITopping & { id: string }>();
        data.toppings.forEach((el) => {
            let obj: { id: string; name: string; price: number } = { id: "", name: "", price: 0 };
            obj.id = el.topping.id;
            obj.name = el.topping.name;
            obj.price = el.topping.price as unknown as number;
            flatObjArr.push(obj);
        });
        let formattedObj = {
            id: data.id,
            name: data.name,
            price: data.price,
            imageUrl: data.imageUrl,
            categoryId: data.categoryId,
            toppings: flatObjArr,
        };
        return formattedObj;
    }
    public async fetchProducts(categoryName: string, page: number, limit: number) {
        const count = await Product.count().catch((err) => {
            throw err;
        });
        const totalPages = Math.floor(count / limit);
        paginationUtil(page, limit, count);
        const products = await Product.fetchProducts(categoryName, limit, page);
        const formattedProducts = new Array<PrismaProduct & { toppings: Array<ITopping & { id: string }> }>();
        for (const el of products) {
            formattedProducts.push(this.formatDbData(el));
        }
        return {
            totalCount: count,
            currentCount: formattedProducts.length,
            page,
            totalPages,
            products: formattedProducts,
        };
    }
    public async remove(id: string) {
        const removedProduct = await Product.removeProduct(id).catch((err) => {
            throw err;
        });
        await FileService.removeFile(
            removedProduct.imageUrl.substring(removedProduct.imageUrl.indexOf("uploads/") + 8),
            false,
        ).catch((err) => {
            throw err;
        });
        return removedProduct;
    }
    public async update(data: IProduct, categoryId: string, id: string) {
        const oldUrl = await Product.getProductImageUrl(id);
        if (data.imageUrl && typeof oldUrl == "string" && oldUrl != data.imageUrl) {
            await FileService.removeFile(oldUrl.substring(oldUrl.indexOf("uploads/") + 8), false).catch((err) => {
                throw err;
            });
        }
        const updatedProduct = await Product.updateProduct(data, categoryId, id).catch((err) => {
            throw err;
        });
        return this.formatDbData(updatedProduct);
    }
}

export default ProductService;
