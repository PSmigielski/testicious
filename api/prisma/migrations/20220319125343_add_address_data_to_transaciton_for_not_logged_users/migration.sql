-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "city" VARCHAR(100),
ADD COLUMN     "name" VARCHAR(100),
ADD COLUMN     "phoneNumber" CHAR(9),
ADD COLUMN     "street" VARCHAR(100),
ADD COLUMN     "streetNumber" INTEGER,
ADD COLUMN     "surname" VARCHAR(100);
