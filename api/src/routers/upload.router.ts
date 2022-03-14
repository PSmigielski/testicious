import { v4 as uuidv4 } from 'uuid';
import express, { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import UploadController from '../controllers/UploadController';
import checkJwt from '../middleware/checkJwt';
import Roles from '../types/Roles';
import checkRole from '../middleware/checkRole';
import ApiErrorException from '../exceptions/ApiErrorException';


const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage, limits: { fileSize: 1024*1024*2, files: 1 },
    fileFilter: (req, file, cb) => {
        if(file.mimetype.indexOf("image") == -1){
           return cb(new ApiErrorException("Invalid file mimetype", 400));
        }
        cb(null, true);
    } 
});
const uploadContoller = new UploadController();
uploadRouter.post("",checkJwt, checkRole(Roles.ADMIN), upload.single("photo"), uploadContoller.create.bind(uploadContoller));
uploadRouter.delete("", checkJwt, checkRole(Roles.ADMIN), uploadContoller.remove.bind(uploadContoller));

export default uploadRouter;