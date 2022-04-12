import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import Roles from "../types/Roles";

const checkRole = (role: Roles) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role != role) {
            throw new ApiErrorException("You don't have a required role", 403);
        }
        next();
    };
};

export default checkRole;
