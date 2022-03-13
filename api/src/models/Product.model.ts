import { Topping, Product as PrismaProduct } from "@prisma/client";
import { timeStamp } from "console";
import { format } from "path";
import ApiErrorException from "../exceptions/ApiErrorException";
import PrismaException from "../exceptions/PrismaException";
import IProduct from "../types/IProduct";
import Model from "./Model";

class Product extends Model{
    private name: string;
    private price: number;
    private categoryId: string;
    private toppings: {toppingId: string}[] | undefined;
    constructor({name, price, toppings}: IProduct, categoryId: string){
        super();
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.toppings = toppings?.map((el: string) => ({ toppingId: el}));
    }
    public async create(){
        const prisma = Product.getPrisma();
        console.log(this.toppings, this.categoryId)
        if(typeof this.toppings !== undefined){
            const product = await prisma.product.create({
                data:{
                    name: this.name,
                    price: this.price,
                    categoryId: this.categoryId,
                    toppings: {
                        create: this.toppings
                    }
                },
                include:{ toppings: { select:{ topping: true } } }
            }).catch(err => { throw PrismaException.createException(err,"Product") });
            return Product.formatDbData(product);
        }else{
            const product = await prisma.product.create({
                data:{
                    name: this.name,
                    price: this.price,
                    categoryId: this.categoryId
                }
            }).catch(err => { throw PrismaException.createException(err,"Product") });
            return product;
        }
    }

    public static async fetchProducts(categoryId: string){
        const prisma = Product.getPrisma();
        const products = await prisma.product.findMany({where: {categoryId}, 
            include:{ toppings: { select:{ topping: true } } }})
        .catch(err => {throw PrismaException.createException(err,"Product")});
        const formattedProducts = new Array<PrismaProduct & { toppings: Array<ITopping & { id: string }> }>();
        for(const el of products){
            formattedProducts.push(Product.formatDbData(el));
        }
        return formattedProducts;
    }
    private static formatDbData(data:PrismaProduct & { toppings: { topping: Topping }[]; }){
        let flatObjArr = new Array<ITopping & { id: string }>();
        data.toppings.forEach((el) => {
            let obj: {id: string, name: string, price: number} = {id: "", name: "", price: 0};
            obj.id = el.topping.id
            obj.name = el.topping.name
            obj.price = (el.topping.price as unknown) as number;
            flatObjArr.push(obj);
        })
        let formattedObj = {
            id: data.id,
            name: data.name,
            price: data.price,
            categoryId: data.categoryId,
            toppings: flatObjArr
        }
        return formattedObj;
    }

    public static async removeProduct(id: string){
        const prisma = Product.getPrisma();
        const removePizza = await prisma.product.delete({where:{ id }}).catch(err => {throw PrismaException.createException(err,"Product")});
        return removePizza;
    }
    private static async updateToppings(toppings: string[], id: string){
        const prisma = Product.getPrisma();
        await prisma.toppingsOnPizzas.deleteMany({where:{productId: id}})
        .catch(err => {throw PrismaException.createException(err,"toppingsOnPizzas")});
        for(const toppingId of toppings){
            const topping = await prisma.toppingsOnPizzas.findMany({where:{toppingId}})
            .catch(err => {throw PrismaException.createException(err,"toppingsOnPizzas")});
            if(topping.length != 0){
                await prisma.toppingsOnPizzas.create({data:{toppingId, productId: id}})
                .catch(err => {throw PrismaException.createException(err,"toppingsOnPizzas")});
            }else{
                throw new ApiErrorException("Topping with this id does not exist!",404)
            }
        }
    }
    public static async updateProduct({name, price, toppings}: IProduct, categoryId: string, id: string){
        const prisma = Product.getPrisma();
        if(toppings){
            await Product.updateToppings(toppings, id)
        }
        const product = await prisma.product.update({
            data: {
                name, price, categoryId
            }, where: {id},
            include:{
                toppings: {
                    select:{
                        topping: true
                    }
                }
            }
        }).catch(err => {throw PrismaException.createException(err,"Product")});
        return Product.formatDbData(product);
    }
}

export default Product;