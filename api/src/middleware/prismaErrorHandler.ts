import { NextFunction, Request, Response } from "express";
import PrismaException from "../exceptions/PrismaException";

const prismaErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }
    if(err instanceof PrismaException){
        return res.status(err.getStatusCode()).json({ error: err.getErrorMessage() });
    }else{
        next(err);
    }
}

export default prismaErrorHandler;