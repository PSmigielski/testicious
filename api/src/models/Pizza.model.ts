import PrismaException from "../exceptions/PrismaException";
import IPizza from "../types/IPizza";
import Model from "./Model";

class Pizza extends Model{
    private name: string;
    private price: number;
    private toppings: string[];
    constructor({name, price, toppings}: IPizza){
        super();
        this.name = name;
        this.price = price;
        this.toppings = toppings;
    }
    public async create(){
        const prisma = Pizza.getPrisma();
        const pizza = await prisma.pizza.create({
            data:{
                name: this.name,
                toppings: this.toppings,
                price: this.price
            }
        }).catch(err => { throw PrismaException.createException(err,"Pizza") });
        return pizza;
    }
}

export default Pizza;