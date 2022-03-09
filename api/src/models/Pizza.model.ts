import PrismaException from "../exceptions/PrismaException";
import IPizza from "../types/IPizza";
import Model from "./Model";

class Pizza extends Model{
    private name: string;
    private price: number;
    private toppings: {toppingId: string}[];
    constructor({name, price, toppings}: IPizza){
        super();
        this.name = name;
        this.price = price;
        this.toppings = toppings.map((el: string) => ({ toppingId: el}));
    }
    public async create(){
        const prisma = Pizza.getPrisma();
        const pizza = await prisma.pizza.create({
            data:{
                name: this.name,
                price: this.price,
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
        }).catch(err => { throw PrismaException.createException(err,"Pizza") });
        return pizza;
    }

    public static async fetchPizzas(){
        const prisma = Pizza.getPrisma();
        const pizzas = await prisma.pizza.findMany().catch(err => {throw PrismaException.createException(err,"Pizza")});
        return pizzas;
    }

    public static async removePizza(id: string){
        const prisma = Pizza.getPrisma();
        const removePizza = await prisma.pizza.delete({where:{ id }}).catch(err => {throw PrismaException.createException(err,"Pizza")});
        return removePizza;
    }

    public static async updatePizza({name, price, toppings}: {name: string, price: number, toppings: string[]}, id: string){
        const prisma = Pizza.getPrisma();
        if(toppings){
            await prisma.toppingsOnPizzas.deleteMany({where:{pizzaId: id}})
            for(const toppingId of toppings){
                await prisma.toppingsOnPizzas.create({data:{toppingId, pizzaId: id}})
            }
        }
        const pizza = await prisma.pizza.update({
            data: {
                name, price
            }, where: {id},
            include:{
                toppings: {
                    select:{
                        topping: true
                    }
                }
            }
        }).catch(err => {throw PrismaException.createException(err,"Pizza")});
        return pizza;
    }
}

export default Pizza;