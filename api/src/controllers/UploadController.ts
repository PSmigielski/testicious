import { NextFunction, Request, Response } from "express";
import fs from "fs";
import ApiErrorException from "../exceptions/ApiErrorException";

class UploadController {
    public create(req: Request, res: Response, next: NextFunction){
        if(!req.file){
            return next(new ApiErrorException("No image found", 404));
        }
        return res.status(201).json({message: "image has been uploaded", link: `${process.env.HOSTNAME}:${process.env.PORT}/${req.file?.path}`})
    };
    public remove(req: Request, res: Response, next: NextFunction){
        const fileName = req.query.name;
        fs.unlink(`${__dirname}/../../uploads/${fileName}`, (err)=>{
            if(err){
                if(err.code == "ENOENT"){
                    return next(new ApiErrorException("This file does not exist",404));
                }else{
                    return next(new ApiErrorException("file removal went wrong",500));
                }
            }
            res.status(202).json({message: "file has been removed"});
        })
    }
}

export default UploadController;