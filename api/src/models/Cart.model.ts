import ApiErrorException from "../exceptions/ApiErrorException";
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
}

export default Cart;