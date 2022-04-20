import Category from "../models/Category.model";
import paginationUtil from "../util/paginationUtil";

class CategoryService {
    public async showAll(page: number, limit: number) {
        const count = await Category.count().catch((err) => {
            throw err;
        });
        const totalPages = Math.floor(count / limit);
        paginationUtil(page, limit, count);
        const categories = await Category.fetchAll(page, limit).catch((err) => {
            throw err;
        });
        return {
            totalCount: count,
            currentCount: categories.length,
            page,
            totalPages,
            categories,
        };
    }
}

export default CategoryService;
