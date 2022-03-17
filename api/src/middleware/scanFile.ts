import NodeClam from "clamscan";
import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";

const scanFile = async (req: Request,res: Response, next: NextFunction) => {
    const clamscan = await new NodeClam().init({
        removeInfected: true,
        scanRecursively: false,
        debugMode: true,
        clamdscan: {
            host: "127.0.0.1",
            port: 3310
        }
    });
    if(req.file?.path){
        const { isInfected, viruses } = await clamscan.scanFile(`${__dirname}/../../${req.file?.path}`)
        if(isInfected){
            console.log(`file is infected with viruses: `,viruses);
            next(new ApiErrorException("file is infected with viruses", 507))
        }
        next()
    }else{
        next(new ApiErrorException("file not found", 404));
    }
}

export default scanFile;