import PrismaException from "../exceptions/PrismaException";
import Model from "./Model";

class Category extends Model {
    private name: string
    constructor(name: string){
        super();
        this.name = name;
    }
    public async create(){
        const prisma = Category.getPrisma()
        const category = await prisma.category.create({
            data: {name: this.name}
        }).catch(err => {throw PrismaException.createException(err,"Category")});
        return category;
    }
    public static async fetchAll(){
        const prisma = Category.getPrisma()
        const categories = await prisma.category.findMany()
        .catch(err => {throw PrismaException.createException(err,"Category")});
        return categories;
    }
    public static async remove(id: string){
        const prisma = Category.getPrisma()
        const category = await prisma.category.delete({ where: {id} })
        .catch(err => {throw PrismaException.createException(err,"Category")});
        return category;
    }
    public static async edit(name: string, id: string){
        const prisma = Category.getPrisma()
        const category = await prisma.category.update({
            data: { name }, where: { id }
        }).catch(err => {throw PrismaException.createException(err,"Category")});
        return category;
    }
}

export default Category