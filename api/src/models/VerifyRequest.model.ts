import PrismaException from "../exceptions/PrismaException";
import Model from "./Model";

class VerifyRequest extends Model {
    public static async create(userId: string) {
        const request = await this.prisma.verifyRequest
            .create({
                data: { userId },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "VerifyRequest");
            });
        return request;
    }
    public static async delete(id: string) {
        const deletedVerifyRequest = await this.prisma.verifyRequest
            .delete({
                where: { id },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "VerifyRequest");
            });
        return deletedVerifyRequest;
    }
    public static async getUniqueVerifyRequest(id: string) {
        const request = await this.prisma.verifyRequest
            .findUnique({
                where: { id },
                include: { user: { select: { id: true } } },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "VerifyRequest");
            });
        return request;
    }
}

export default VerifyRequest;
