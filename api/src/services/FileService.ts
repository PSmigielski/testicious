import fs from "fs";
import ApiErrorException from "../exceptions/ApiErrorException";

class FileService {
    public static async removeFile(fileName: string, strict: boolean = true) {
        return new Promise((resolve, reject) => {
            fs.unlink(`${__dirname}/../../uploads/${fileName}`, (err) => {
                if (err && strict) {
                    if (err.code == "ENOENT") {
                        reject(new ApiErrorException("This file does not exist", 404));
                    } else {
                        reject(new ApiErrorException("file removal went wrong", 500));
                    }
                }
                resolve(true);
            });
        });
    }
}
export default FileService;
