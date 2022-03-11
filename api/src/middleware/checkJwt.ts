import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiErrorException from "../exceptions/ApiErrorException";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.BEARER) {
        throw new ApiErrorException("Token not found", 401);
    }
    const token = jwt.verify(req.cookies.BEARER, process.env.JWT_SECRET as string);
    if(typeof token == "string"){
        throw new ApiErrorException("Something went wrong", 500);
    }
    req.user = token as jwt.JwtPayload;
    next();
}

export default checkJwt;