import PrismaException from "../exceptions/PrismaException";
import IDiscount from "../types/IDiscount";
import Model from "./Model";

class Discount extends Model{
    private code: string;
    private precent: number;
    private expDate: Date;
    constructor(data: IDiscount){
        super();
        this.code = data.code;
        this.precent = data.precent;
        this.expDate = data.expDate;
    }  
    public async create(){
        const prisma = Discount.getPrisma();
        const discount = await prisma.discount.create({data: {
            code: this.code,
            precent: this.precent,
            expirationDate: this.expDate
        }})
        .catch(err => {throw PrismaException.createException(err,"Discount")});
        return discount;
    }
    public static async remove(id: string){
        const prisma = Discount.getPrisma();
        const removedDiscount = await prisma.discount.delete({where: {id}})
        .catch(err => {throw PrismaException.createException(err,"Discount")});
        return removedDiscount
    }
    public static async edit(id: string, data: IDiscount){
        const prisma = Discount.getPrisma();
        const updatedDiscount = await prisma.discount.update({where: {id}, data})
        .catch(err => {throw PrismaException.createException(err,"Discount")});
        return updatedDiscount;
    }
    public static async fetchAll(){
        const prisma = Discount.getPrisma();
        const discounts = await prisma.discount.findMany()
        .catch(err => {throw PrismaException.createException(err,"Discount")});
        return discounts
    }
}

export default Discount