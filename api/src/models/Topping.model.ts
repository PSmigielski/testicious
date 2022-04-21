import PrismaException from "../exceptions/PrismaException";
import Model from "./Model";

class Topping extends Model {
    private name: string;
    private price: number;
    constructor({ price, name }: ITopping) {
        super();
        this.name = name;
        this.price = price;
    }
    public async create() {
        const topping = await this.prisma.topping
            .create({
                data: {
                    name: this.name,
                    price: this.price,
                },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Topping");
            });
        return topping;
    }
    public static async fetchAllToppings(page: number, limit: number) {
        const toppings = await this.prisma.topping
            .findMany({ take: limit, skip: page * limit, orderBy: { name: "asc" } })
            .catch((err) => {
                throw PrismaException.createException(err, "Topping");
            });
        return toppings;
    }
    public static async removeTopping(id: string) {
        const removedTopping = await this.prisma.topping.delete({ where: { id } }).catch((err) => {
            throw PrismaException.createException(err, "Topping");
        });
        return removedTopping;
    }
    public static async count() {
        return await this.prisma.topping.count();
    }
    public static async editTopping(id: string, { name, price }: ITopping) {
        const updatedTopping = await this.prisma.topping
            .update({ where: { id }, data: { name, price } })
            .catch((err) => {
                throw PrismaException.createException(err, "Topping");
            });
        return updatedTopping;
    }
}

export default Topping;
