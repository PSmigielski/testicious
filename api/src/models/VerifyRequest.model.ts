
import PrismaException from "../exceptions/PrismaException";
import Model from "./Model"

class VerifyRequest extends Model {
    public static async create(userId: string) {
        const prisma = VerifyRequest.getPrisma();
        const request = await prisma.verifyRequest.create({ 
            data: { userId }
        }).catch(err => { throw PrismaException.createException(err,"VerifyRequest") });
        return request;
    }
    public static async delete( id: string ){
        const prisma = VerifyRequest.getPrisma();
        const deletedVerifyRequest = await prisma.verifyRequest.delete({
            where: { id }
        }).catch(err => { throw PrismaException.createException(err,"VerifyRequest") });
        return deletedVerifyRequest;
    }
    public static async getUniqueVerifyRequest(id: string){
        const prisma = VerifyRequest.getPrisma();
        const request = await prisma.verifyRequest.findUnique({
            where: { id },
            include: { user:{ select: { id:true } } }
        }).catch(err => { throw PrismaException.createException(err,"VerifyRequest") });
        return request
    }
}

export default VerifyRequest;