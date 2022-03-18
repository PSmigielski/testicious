import { Decimal } from "@prisma/client/runtime";
import PrismaException from "../exceptions/PrismaException";
import Model from "./Model";

class Cart extends Model{
    private userId: string;
    constructor(userId: string){
        super();
        this.userId = userId;
    }
    public async create(){
        const prisma = Cart.getPrisma();
        const cart = await prisma.cart.create({
            data:{userId: this.userId}
        }).catch(err => { throw PrismaException.createException(err,"Cart") });
        return cart;
    }
    public static async isOwner(userId: string, cartId: string){
        const prisma = Cart.getPrisma();
        const isOwner = await prisma.cart.findUnique({where: {
            id:cartId
        },
        select:{
            userId:true
        }}).catch(err => { throw PrismaException.createException(err,"Cart") });
        if(userId !== isOwner?.userId){
            return false;
        }
        return true;
    }
    public static async getItems(id: string){
        const prisma = Cart.getPrisma();
        const items = await prisma.cart.findUnique({where: {id}, include:{
            items:{
                include:{
                    product:{
                        select:{
                            price:true
                        }
                    }
                }
            }
        }}).catch(err => { throw PrismaException.createException(err,"Cart") });
        return items;
    }
    public static async getOverallPrice(cartId: string){
        const prisma = Cart.getPrisma();
        const cart = await prisma.cart.findUnique({where: {id: cartId}, select: {overallPrice: true}})
        .catch(err => { throw PrismaException.createException(err,"Cart") });
        return cart?.overallPrice;
    }
    public static async updateOverallPrice(price: Decimal, cartId: string){
        const prisma = Cart.getPrisma();
        const currentOverallPrice = await Cart.getOverallPrice(cartId) as Decimal;
        const updatedCart = await prisma.cart.update({where: {id: cartId}, data: {
            overallPrice: currentOverallPrice.add(price).toFixed(2)}})
        return updatedCart.overallPrice;
    }
    public static async checkStatus(id: string){
        const prisma = Cart.getPrisma();
        const cart = await prisma.cart.findUnique({where:{id}, select: {isActive:true}})
        .catch(err => { throw PrismaException.createException(err,"Cart") });
        return cart?.isActive;
    }
    public static async archivise(id: string){
        const prisma = Cart.getPrisma();
        const updatedCart = await prisma.cart.update({where: {id}, data: {isActive:false}})
        .catch(err => { throw PrismaException.createException(err,"Cart") });
        return updatedCart;
    }
}

export default Cart;