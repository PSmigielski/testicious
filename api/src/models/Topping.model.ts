import PrismaException from "../exceptions/PrismaException";
import Model from "./Model";

class Topping extends Model{
    private name: string;
    private price: number;
    constructor({price, name}: ITopping){
        super();
        this.name = name;
        this.price = price;
    }
    public async create(){
        const prisma = Topping.getPrisma();
        const topping = await prisma.topping.create({data: {
            name: this.name,
            price: this.price
        }}).catch(err => { throw PrismaException.createException(err,"Topping") });
        return topping;
    }
    public static async fetchAllToppings(){
        const prisma = Topping.getPrisma();
        const toppings = await prisma.topping.findMany()
        .catch(err => { throw PrismaException.createException(err,"Topping") });
        return toppings;
    }
    public static async removeTopping(id: string){
        const prisma = Topping.getPrisma();
        const removedTopping = prisma.topping.delete({where:{id}})
        .catch(err => { throw PrismaException.createException(err,"Topping") });
        return removedTopping;
    }
    public static async editTopping(id:string,{name, price}: ITopping){
        const prisma = Topping.getPrisma();
        const updatedTopping = prisma.topping.update({where:{id}, data:{name, price}})
        .catch(err => { throw PrismaException.createException(err,"Topping") });
        return updatedTopping
    }
}

export default Topping;