import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";

const parameterPollutionMiddleware = (parameters: string | string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (Array.isArray(parameters)) {
            for (const parameter of parameters) {
                if (Array.isArray(req.query[parameter])) {
                    throw new ApiErrorException("You cannot specify two or more of the same parameter", 409);
                }
            }
        } else {
            if (Array.isArray(req.query[parameters])) {
                throw new ApiErrorException("You cannot specify two or more of the same parameter", 409);
            }
        }
        next();
    };
};

export default parameterPollutionMiddleware;
