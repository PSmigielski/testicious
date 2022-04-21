import { Decimal } from "@prisma/client/runtime";

interface ITransaction {
    id: string;
    cartId: string;
    cart: {
        overallPrice: Decimal;
        items: Array<{
            cartItem: {
                quantity: number;
                product: {
                    id: string;
                    name: string;
                    price: Decimal;
                    imageUrl: string;
                    category: {
                        name: string;
                    };
                };
            };
        }>;
    };
}
export default ITransaction;
