-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "login" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerifyRequest" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "VerifyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPasswordRequest" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "ResetPasswordRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerifyRequest_userId_key" ON "VerifyRequest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordRequest_userId_key" ON "ResetPasswordRequest"("userId");

-- AddForeignKey
ALTER TABLE "VerifyRequest" ADD CONSTRAINT "VerifyRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPasswordRequest" ADD CONSTRAINT "ResetPasswordRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
