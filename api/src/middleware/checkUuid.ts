import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";

const checkUuid = (ids: Array<string> | string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const regexp = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
        if (Array.isArray(ids)) {
            let tempArr = new Array<string>();
            ids.forEach((el) => {
                tempArr.push(req.params[el]);
            });
            tempArr.forEach((el) => {
                const test = regexp.test(el);
                if (!test) {
                    throw new ApiErrorException("invalid id format", 400);
                }
            });
        } else {
            const test = regexp.test(req.params[ids]);
            if (!test) {
                throw new ApiErrorException("invalid id format", 400);
            }
        }
        next();
    };
};

export default checkUuid;
