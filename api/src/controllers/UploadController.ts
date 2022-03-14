import { NextFunction, Request, Response } from "express";
import fs from "fs";
import ApiErrorException from "../exceptions/ApiErrorException";
import FileService from "../services/FileService";

class UploadController {
    public create(req: Request, res: Response, next: NextFunction){
        if(!req.file){
            return next(new ApiErrorException("No image found", 404));
        }
        return res.status(201).json({message: "image has been uploaded", link: `${process.env.HOSTNAME}:${process.env.PORT}/${req.file?.path}`})
    };
    public async remove(req: Request, res: Response, next: NextFunction){
        const fileName = req.query.name as string;
        const result = await FileService.removeFile(fileName).catch(next)
        if(result){
            return res.status(202).json({message: "file has been removed"});
        }
    }
}

export default UploadController;