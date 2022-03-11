import PrismaException from "../exceptions/PrismaException";
import IItem from "../types/IItem";
import Model from "./Model";

class Item extends Model {
    private cartId: string;
    private pizzaId: string;
    private quantity: number;
    constructor({cartId, pizzaId, quantity}: IItem){
        super();
        this.pizzaId = pizzaId;
        this.cartId = cartId;
        this.quantity = quantity;
    }
    public async create(){
        const prisma = Item.getPrisma();
        const hasItem = await Item.getItemByPizzaId(this.pizzaId, this.cartId)
        if(hasItem.length != 0){
            this.quantity += hasItem[0].quantity;
            await Item.removeItem(hasItem[0].id);
        }
        const item = await prisma.items.create({data:{
            pizzaId: this.pizzaId, cartId: this.cartId, quantity:this.quantity
        }}).catch(err => { throw PrismaException.createException(err,"Item") });
        return item;
    }
    public static async getItemByPizzaId(pizzaId: string, cartId: string){
        const prisma = Item.getPrisma();
        const item = await prisma.items.findMany({
            where: {pizzaId, cartId}
        }).catch(err => { throw PrismaException.createException(err,"Item") });
        return item;
    }
    public static async removeItem(id: string){
        const prisma = Item.getPrisma();
        const removedItem = await prisma.items.delete({where:{id}})
        .catch(err => { throw PrismaException.createException(err,"Item") });
        return removedItem;
    }
    public static async edit(id: string, quantity: number){
        const prisma = Item.getPrisma();
        const updatedItem = await prisma.items.update({where:{id}, data:{quantity}})
        .catch(err => { throw PrismaException.createException(err,"Item") });
        return updatedItem;
    }
}

export default Item;