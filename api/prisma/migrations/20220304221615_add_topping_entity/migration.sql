-- CreateTable
CREATE TABLE "Topping" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "Topping_pkey" PRIMARY KEY ("id")
);
