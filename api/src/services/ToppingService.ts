import Topping from "../models/Topping.model";
import paginationUtil from "../util/paginationUtil";

class ToppingService {
    public async fetchAllToppings(page: number, limit: number) {
        const count = await Topping.count().catch((err) => {
            throw err;
        });
        const totalPages = Math.floor(count / limit);
        paginationUtil(page, limit, count);
        const toppings = await Topping.fetchAllToppings(page, limit).catch((err) => {
            throw err;
        });
        return {
            totalCount: count,
            currentCount: toppings.length,
            page,
            totalPages,
            toppings,
        };
    }
}
export default ToppingService;
