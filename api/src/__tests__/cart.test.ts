import cookieParser from "cookie-parser";
import { json } from "express";
import supertest from "supertest";
import AuthController from "../controllers/AuthController";
import CartController from "../controllers/CartController";
import errorHandler from "../middleware/errorHandler";
import prismaErrorHandler from "../middleware/prismaErrorHandler";
import cors from "cors";
import Server from "../config/Server";

const controllers = [new AuthController(), new CartController()];
const globalMiddleware = [cookieParser(), json(), cors({ credentials: true, origin: process.env.FRONTEND_URL })];
const errorHandlers = [prismaErrorHandler, errorHandler];
const app = new Server(controllers, globalMiddleware, errorHandlers).getApp();
const userLoginInput = {
    email: "admin@pizzaPolaka.com",
    password: "0O9i8u7y!",
};
describe("cart", () => {
    describe("create", () => {
        it("should fail if user is not logged in", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/carts");
            expect(statusCode).toBe(401);
        });
        it("should create cart successfully if all conditions are met", async () => {
            const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
            const { statusCode } = await supertest(app).post("/v1/api/carts").set("Cookie", headers["set-cookie"]);
            expect(statusCode).toBe(201);
        });
    });
    describe("get items", () => {
        it("should fail if user is not logged in", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/carts");
            expect(statusCode).toBe(401);
        });
    });
});
