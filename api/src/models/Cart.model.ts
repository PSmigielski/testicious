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
}

export default Cart;