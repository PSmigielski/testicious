import { Decimal } from "@prisma/client/runtime";
import ApiErrorException from "../exceptions/ApiErrorException";
import PrismaException from "../exceptions/PrismaException";
import Cart from "./Cart.model";
import Discount from "./Discount.model";
import Model from "./Model";

class Transaction extends Model{
    private cartId: string;
    private userId: string;
    private discountCode?: string;
    constructor(cartId: string, userId: string, discountCode?: string){
        super();
        this.cartId = cartId;
        this.userId = userId;
        this.discountCode = discountCode;
    }
    public async create(){
        const prisma = Transaction.getPrisma();
        const cart = await Cart.getItems(this.cartId);
        if(cart?.items.length == 0){
            throw new ApiErrorException("At least one item in cart required", 400);
        }
        if(this.discountCode){
            const discount = await Discount.getDiscountByCode(this.discountCode);
            if(!Discount.isValid(discount?.id as string)){
                throw new ApiErrorException("This discount is expired", 404);
            }
            const overallPrice = await Cart.getOverallPrice(this.cartId) as Decimal;
            const newPrice = overallPrice.mul(1-(await Discount.getDiscountPrecent(discount?.id as string)/100)).sub(overallPrice).abs()
            await Cart.updateOverallPrice(newPrice.mul(-1), this.cartId)
            const transaction = await prisma.transaction.create({data:{
                cartId: this.cartId,
                userId: this.userId,
                appliedDiscountId: discount?.id
            }, select: {
                id: true,
                cartId: true,
                appliedDiscount:{
                    select:{
                        code: true,
                        precent: true
                    }
                },
                cart:{
                    select:{
                        overallPrice: true,
                        items:{
                            select:{
                                cartItem: {
                                    select:{
                                        quantity: true,
                                        product:{
                                            select:{
                                                id: true,
                                                name: true,
                                                price: true,
                                                imageUrl: true,
                                                category:{
                                                    select: {
                                                        name: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }}).catch(err => { throw PrismaException.createException(err,"Transaction") })
            return transaction;
        }else{
            const transaction = await prisma.transaction.create({data:{
                cartId: this.cartId,
                userId: this.userId,
            },select: {
                id: true,
                cartId: true,
                cart:{
                    select:{
                        overallPrice: true,
                        items:{
                            select:{
                                cartItem: {
                                    select:{
                                        quantity: true,
                                        product:{
                                            select:{
                                                id: true,
                                                name: true,
                                                price: true,
                                                imageUrl: true,
                                                category:{
                                                    select: {
                                                        name: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }}).catch(err => { throw PrismaException.createException(err,"Transaction") })
            return transaction;
        }
    }
}

export default Transaction