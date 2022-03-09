import ApiErrorException from "../exceptions/ApiErrorException";
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
    private static async updateToppings(toppings: string[], id: string){
        const prisma = Pizza.getPrisma();
        await prisma.toppingsOnPizzas.deleteMany({where:{pizzaId: id}})
        .catch(err => {throw PrismaException.createException(err,"toppingsOnPizzas")});
        for(const toppingId of toppings){
            const topping = await prisma.toppingsOnPizzas.findMany({where:{toppingId}})
            .catch(err => {throw PrismaException.createException(err,"toppingsOnPizzas")});
            if(topping.length != 0){
                await prisma.toppingsOnPizzas.create({data:{toppingId, pizzaId: id}})
                .catch(err => {throw PrismaException.createException(err,"toppingsOnPizzas")});
            }else{
                throw new ApiErrorException("Topping with this id does not exist!",404)
            }
        }
    }
    public static async updatePizza({name, price, toppings}: {name: string, price: number, toppings: string[]}, id: string){
        const prisma = Pizza.getPrisma();
        if(toppings){
            await Pizza.updateToppings(toppings, id)
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