import PrismaException from "../exceptions/PrismaException";
import ICartItem from "../types/ICartItem";
import Model from "./Model";

class CartItem extends Model {
    private cartId: string;
    private productId: string;
    private quantity: number;
    constructor({cartId, productId, quantity}: ICartItem){
        super();
        this.productId = productId;
        this.cartId = cartId;
        this.quantity = quantity;
    }
    public async create(){
        const prisma = CartItem.getPrisma();
        const hasItem = await CartItem.getItemByproductId(this.productId, this.cartId)
        if(hasItem.length != 0){
            this.quantity += hasItem[0].quantity;
            await CartItem.removeItem(hasItem[0].id);
        }
        const item = await prisma.cartItem.create({data:{
            productId: this.productId, cartId: this.cartId, quantity:this.quantity
        }}).catch(err => { throw PrismaException.createException(err,"Item") });
        return item;
    }
    public static async getItemByproductId(productId: string, cartId: string){
        const prisma = CartItem.getPrisma();
        const item = await prisma.cartItem.findMany({
            where: {productId, cartId}
        }).catch(err => { throw PrismaException.createException(err,"Item") });
        return item;
    }
    public static async removeItem(id: string){
        const prisma = CartItem.getPrisma();
        const removedItem = await prisma.cartItem.delete({where:{id}})
        .catch(err => { throw PrismaException.createException(err,"Item") });
        return removedItem;
    }
    public static async edit(id: string, quantity: number){
        const prisma = CartItem.getPrisma();
        const updatedItem = await prisma.cartItem.update({where:{id}, data:{quantity}})
        .catch(err => { throw PrismaException.createException(err,"Item") });
        return updatedItem;
    }
}

export default CartItem;