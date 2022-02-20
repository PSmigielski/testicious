-- CreateTable
CREATE TABLE "Pizza" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "toppings" VARCHAR(100)[],

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);
