import { PrismaClient } from ".prisma/client";

abstract class Model {
    private static prisma: PrismaClient = new PrismaClient();
    protected static getPrisma() {
        return this.prisma;
    }
}

export default Model;