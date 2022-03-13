interface IProduct{
    name: string,
    price: number,
    categoryId: string,
    toppings?: string[]
}

export default IProduct;