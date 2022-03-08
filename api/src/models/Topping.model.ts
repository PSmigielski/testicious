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
        const toppings = await prisma.topping.findMany().catch(err => { throw PrismaException.createException(err,"Topping") });
        return toppings
    }
}

export default Topping;