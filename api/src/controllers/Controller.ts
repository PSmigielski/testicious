import { Router } from "express";
import IRoute from "../types/IRoute";

abstract class Controller{
    private router: Router = Router();
    public abstract path: string;
    protected readonly routes: Array<IRoute> = [];
    public setRoutes(){
        for (const route of this.routes) {
            switch (route.method) {
                case 'GET':
                    this.router.get(route.path, route.localMiddleware, route.handler);
                    break;
                case 'POST':
                    this.router.post(route.path, route.localMiddleware, route.handler);
                    break;
                case 'PUT':
                    this.router.put(route.path, route.localMiddleware, route.handler);
                    break;
                case 'DELETE':
                    this.router.delete(route.path, route.localMiddleware, route.handler);
                    break;
                default:
                    console.log("Route setup failed")
            };
        }
        return this.router;
    }
}

export default Controller;