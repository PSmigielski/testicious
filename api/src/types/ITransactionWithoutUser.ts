import { Decimal } from "@prisma/client/runtime"

interface ITransactionWithoutUserData{
    clientData: {
        name: string,
        surname: string,
        phoneNumber: string,
        city: string,
        buildingNumber: number,
        homeNumber?: number,
        street: string,
        email: string,
    }
    cart: {
        overallPrice: number, 
        items: Array<{
            quantity: number, 
            product: {
                id: string,
                name: string,
                price: number,
                imageUrl: string,
                category: {
                    name: string
                }
            }
        }>
    }
} 

export default ITransactionWithoutUserData;