import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";

const parameterPollutionMiddleware = (parameters: string | string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (Array.isArray(parameters)) {
            console.log("1");
            for (const parameter of parameters) {
                console.log(parameter);
                if (Array.isArray(req.query[parameter])) {
                    throw new ApiErrorException("You cannot specify two or more of the same parameter", 409);
                }
            }
        } else {
            console.log("2");
            if (Array.isArray(req.query[parameters])) {
                throw new ApiErrorException("You cannot specify two or more of the same parameter", 409);
            }
        }
        next();
    };
};

export default parameterPollutionMiddleware;
