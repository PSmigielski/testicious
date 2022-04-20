import ApiErrorException from "../exceptions/ApiErrorException";

const paginationUtil = (page: number, limit: number, count: number) => {
    if (page <= 0 || limit <= 0) {
        throw new ApiErrorException(`${limit <= 0 ? "limit" : "page"} number can't be negative or zero`, 400);
    }
    if (page * limit > count) {
        throw new ApiErrorException("page overflow", 400);
    }
};

export default paginationUtil;
