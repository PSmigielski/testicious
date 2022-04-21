import { PrismaClient } from ".prisma/client";

abstract class Model {
    protected prisma: PrismaClient = new PrismaClient();
    protected static prisma: PrismaClient = new PrismaClient();
}

export default Model;
