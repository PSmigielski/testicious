import PrismaException from "../exceptions/PrismaException";
import Model from "./Model";

class Category extends Model {
    private name: string;
    constructor(name: string) {
        super();
        this.name = name;
    }
    public async create() {
        const category = await this.prisma.category
            .create({
                data: { name: this.name },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Category");
            });
        return category;
    }
    public static async fetchAll(page: number, limit: number) {
        const categories = await this.prisma.category
            .findMany({
                take: limit,
                skip: page * limit,
                orderBy: { name: "asc" },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Category");
            });
        return categories;
    }
    public static async count() {
        return await this.prisma.category.count().catch((err) => {
            throw PrismaException.createException(err, "Category");
        });
    }
    public static async remove(id: string) {
        const category = await this.prisma.category.delete({ where: { id } }).catch((err) => {
            throw PrismaException.createException(err, "Category");
        });
        return category;
    }
    public static async edit(name: string, id: string) {
        const category = await this.prisma.category
            .update({
                data: { name },
                where: { id },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "Category");
            });
        return category;
    }
}

export default Category;
