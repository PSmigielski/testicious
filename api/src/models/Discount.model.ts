import PrismaException from "../exceptions/PrismaException";
import IDiscount from "../types/IDiscount";
import Model from "./Model";

class Discount extends Model {
    private code: string | undefined;
    private precent: number | undefined;
    private expDate: Date;
    constructor(data: IDiscount) {
        super();
        this.code = data.code;
        this.precent = data.precent;
        this.expDate = new Date((data?.expDate as number) * 1000);
    }
    public async create() {
        const discount = await this.prisma.discount
            .create({
                data: {
                    code: this.code as string,
                    precent: this.precent as number,
                    expirationDate: this.expDate,
                },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Discount");
            });
        await Discount.isValid(discount.id);
        return discount;
    }
    public static async getDiscountPrecent(id: string) {
        const discount = await this.prisma.discount.findUnique({ where: { id } }).catch((err) => {
            throw PrismaException.createException(err, "Discount");
        });
        return discount?.precent as number;
    }
    public static async getDiscountByCode(code: string) {
        const discount = await this.prisma.discount.findUnique({ where: { code } }).catch((err) => {
            throw PrismaException.createException(err, "Discount");
        });
        return discount;
    }
    public static async remove(id: string) {
        const removedDiscount = await this.prisma.discount.delete({ where: { id } }).catch((err) => {
            throw PrismaException.createException(err, "Discount");
        });
        return removedDiscount;
    }
    public static async edit(id: string, { code, precent, expDate }: IDiscount) {
        if (expDate) {
            const date = new Date(expDate * 1000);
            const updatedDiscount = await this.prisma.discount
                .update({
                    where: { id },
                    data: {
                        code,
                        precent,
                        expirationDate: date,
                    },
                })
                .catch((err) => {
                    throw PrismaException.createException(err, "Discount");
                });
            return updatedDiscount;
        } else {
            const updatedDiscount = await this.prisma.discount
                .update({
                    where: { id },
                    data: {
                        code,
                        precent,
                    },
                })
                .catch((err) => {
                    throw PrismaException.createException(err, "Discount");
                });
            return updatedDiscount;
        }
    }
    public static async fetchAll() {
        const discounts = await this.prisma.discount.findMany().catch((err) => {
            throw PrismaException.createException(err, "Discount");
        });
        return discounts;
    }
    public static async isValid(id: string) {
        const discount = await this.prisma.discount.findUnique({ where: { id }, select: { expirationDate: true } });
        const discountDate = discount?.expirationDate.getTime() as number;
        if (Date.now() > discountDate) {
            return false;
        } else {
            return true;
        }
    }
}

export default Discount;
