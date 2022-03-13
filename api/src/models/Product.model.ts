import ApiErrorException from "../exceptions/ApiErrorException";
import PrismaException from "../exceptions/PrismaException";
import IProduct from "../types/IProduct";
import Model from "./Model";

class Product extends Model{
    private name: string;
    private price: number;
    private categoryId: string;
    private toppings: {toppingId: string}[] | undefined;
    constructor({name, price, categoryId, toppings}: IProduct){
        super();
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.toppings = toppings?.map((el: string) => ({ toppingId: el}));
    }
    public async create(){
        const prisma = Product.getPrisma();
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
                include:{
                    toppings: {
                        select:{
                            topping: true
                        }
                    }
                }
            }).catch(err => { throw PrismaException.createException(err,"Product") });
            return product;
        }else{
            const product = await prisma.product.create({
                data:{
                    name: this.name,
                    price: this.price,
                    categoryId: this.categoryId
                },
                include:{
                    toppings: {
                        select:{
                            topping: true
                        }
                    }
                }
            }).catch(err => { throw PrismaException.createException(err,"Product") });
            return product;
        }
    }

    public static async fetchProducts(categoryId: string){
        const prisma = Product.getPrisma();
        const products = await prisma.product.findMany({where: {categoryId}}).catch(err => {throw PrismaException.createException(err,"Product")});
        return products;
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
    public static async updateProduct({name, price,categoryId, toppings}: IProduct, id: string){
        const prisma = Product.getPrisma();
        if(toppings){
            await Product.updateToppings(toppings, id)
        }
        const pizza = await prisma.product.update({
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
        return pizza;
    }
}

export default Product;