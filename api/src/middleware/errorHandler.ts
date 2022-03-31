import { NextFunction, Request, Response } from "express";
import { ErrorCode, MulterError } from "multer";
import ApiErrorException from "../exceptions/ApiErrorException";

const errorHandler = (err: ApiErrorException | Error | MulterError, req: Request, res: Response, next: NextFunction) => {
    //console.log(res.headersSent,err,err?.stack);
    if (res.headersSent) {
        return next(err);
    }
    return res.status(err instanceof ApiErrorException ? err.getCode() : 500).json({ error: err.message });
}

export default errorHandler;