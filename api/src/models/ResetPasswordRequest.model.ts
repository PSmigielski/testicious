import ApiErrorException from "../exceptions/ApiErrorException";
import PrismaException from "../exceptions/PrismaException";
import Model from "./Model";

class ResetPasswordRequest extends Model {
    public static async create(userId: string) {
        const prisma = ResetPasswordRequest.getPrisma();
        const request = await prisma.resetPasswordRequest.create({ data: { userId } }).catch(err => { throw PrismaException.createException(err,"ResetPasswordRequest") });
        return request
    }
    public static async getRequest(requestId: string) {
        const prisma = ResetPasswordRequest.getPrisma()
        const request = await prisma.resetPasswordRequest.findUnique({ 
            where: { id: requestId } 
        }).catch(err => { throw PrismaException.createException(err,"ResetPasswordRequest") });
        if (request == undefined) {
            throw new ApiErrorException("Reset password request with this id does not exist!", 404);
        } else {
            return request;
        }
    }
    public static async removeRequest(requestId: string) {
        const prisma = ResetPasswordRequest.getPrisma();
        const request = await prisma.resetPasswordRequest.delete({
            where: { id: requestId } 
        }).catch(err => { throw PrismaException.createException(err,"ResetPasswordRequest") });
        return true;
    }
}

export default ResetPasswordRequest;