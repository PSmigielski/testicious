import express, {Express, NextFunction, Request, RequestHandler, Response} from "express";

import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "../middleware/errorHandler";
import prismaErrorHandler from "../middleware/prismaErrorHandler";
import Controller from "../controllers/Controller";

class Server {
    private app: Express;
    private controllers: Array<Controller>;
    private globalMiddleware: Array<RequestHandler>;
    private errorHandlers: Array<(err: Error, req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>>;
    private pathPrefix: string = "/v1/api";
    constructor(
        controllers: Array<Controller>, 
        globalMiddleware: Array<RequestHandler>, 
        errorHandlers: Array<(err: Error, req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>>
    ){
        dotenv.config();
        this.app = express();
        this.controllers = controllers;
        this.globalMiddleware = globalMiddleware;
        this.errorHandlers = errorHandlers;
        this.setupMiddleware();
        this.setupStaticContent();
        this.setupControllers();
        this.setupErrorHandling()
    }
    private setupControllers(){
        this.controllers.forEach(controller => {
            console.log(`${this.pathPrefix}${controller.path}`)
            this.app.use(`${this.pathPrefix}${controller.path}`, controller.setRoutes());
        });
    }
    private setupStaticContent(){
        this.app.use('/uploads', express.static('uploads'));
    }
    private setupMiddleware(){
        this.globalMiddleware.forEach(middleware => {
            this.app.use(middleware);
        })
    }
    private setupErrorHandling(){
        this.errorHandlers.forEach(errorHandler => {
            this.app.use(errorHandler);
        })
    }
    public startServer(){
        this.app.listen(process.env.PORT, () => console.log(`[LOG] api is running at ${process.env.HOSTNAME}:${process.env.PORT}`));
    }
}

export default Server;