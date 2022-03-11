import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.create({
        data: {
            name: "Admin",
            surname: "Admin",
            phoneNumber: "131123123",
            email: "admin@pizzaPolaka.com",
            role: "ADMIN", 
            isVerified: true,
            password: "f0426a735db8a1371c2338ce7dee1267b3e07de50696f71cddb85bf83cbec253:c3cb5cb09554ace6f848361df6dd8e031fb3d43a702b328c7bf146c594d685194f5e4f0be4f194dfe1990bef9b5de110d4d0b27d2b8195c1f504bbcdadb3fc7c"
        }
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })