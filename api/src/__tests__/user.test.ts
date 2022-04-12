import supertest from "supertest";
import Server from "../config/Server";
import AuthController from "../controllers/AuthController";
import cookieParser from "cookie-parser";
import { json } from "express";
import cors from "cors";
import prismaErrorHandler from "../middleware/prismaErrorHandler";
import errorHandler from "../middleware/errorHandler";
import User from "../models/User.model";
import { PrismaClient } from "@prisma/client";

const controllers = [new AuthController()];
const globalMiddleware = [cookieParser(), json(), cors({ credentials: true, origin: process.env.FRONTEND_URL })];
const errorHandlers = [prismaErrorHandler, errorHandler];
const app = new Server(controllers, globalMiddleware, errorHandlers).getApp();
const userLoginInput = {
    email: "admin@pizzaPolaka.com",
    password: "0O9i8u7y!",
};
const userRegisterInput = {
    email: "test@test.com",
    name: "Paweł",
    surname: "Śmigielski",
    phoneNumber: "832187265",
    password: "Oo9i8u7y!",
    city: "Poznań",
    street: "Półwiejska",
    buildingNumber: 3,
    homeNumber: 21,
};
describe("user", () => {
    describe.skip("login", () => {
        it("should login successfully", async () => {
            const { statusCode, body, headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
            expect(statusCode).toBe(200);
            expect(body).toStrictEqual({
                message: "user logged in",
                user: {
                    id: "e366d6fc-7b0d-43cd-85ac-11e5a104a6f8",
                    email: "admin@pizzaPolaka.com",
                    role: "ADMIN",
                },
            });
            expect(headers["set-cookie"].length).toBe(2);
        });
        it("should fail if you pass wrong credentials", async () => {
            const { statusCode, body } = await supertest(app)
                .post("/v1/api/auth/login")
                .send({ ...userLoginInput, email: "fail@gmail.com" });
            expect(statusCode).toBe(401);
            expect(body).toStrictEqual({
                error: "Wrong credentials",
            });
        });
        it("should fail if you are not verified", async () => {
            const user = await new User(userRegisterInput).createUser();
            const { statusCode, body } = await supertest(app)
                .post("/v1/api/auth/login")
                .send({ email: userRegisterInput.email, password: userRegisterInput.password });
            expect(statusCode).toBe(401);
            expect(body).toStrictEqual({ error: "user is not verified" });
            //@ts-ignore
            await User.remove(user.id);
        });
        it("should fail if you do not pass valid data", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/auth/login");
            expect(statusCode).toBe(400);
        });
    });
    describe.skip("register", () => {
        it("should fail if you do not pass valid data", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/auth/register");
            expect(statusCode).toBe(400);
        });
        it("should fail if you pass email that exist in database", async () => {
            const { statusCode } = await supertest(app)
                .post("/v1/api/auth/register")
                .send({ ...userRegisterInput, email: "admin@pizzaPolaka.com" });
            expect(statusCode).toBe(409);
        });
        it("should register successfully if you pass correct data", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/auth/register").send(userRegisterInput);
            expect(statusCode).toBe(200);
            const prisma = new PrismaClient();
            await prisma.user.delete({ where: { email: userRegisterInput.email } });
        });
    });
    describe.skip("logout", () => {
        it("should logout successfully if cookies are present", async () => {
            const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
            const { statusCode } = await supertest(app)
                .post("/v1/api/auth/logout")
                .set("Cookie", headers["set-cookie"]);
            expect(statusCode).toBe(202);
        });
        it("should fail if cookies are not present", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/auth/logout");
            expect(statusCode).toBe(401);
        });
    });
    describe("refresh", () => {
        it("", async () => {});
        it("", async () => {});
    });
    describe("verify", () => {
        //has valid request uuid, true:202 false: 400
        //request exist true: 202 false: 404
        it("", async () => {});
    });
    describe("reset password", () => {
        it("", async () => {});
    });
    describe("edit", () => {
        describe("edit user data", () => {
            it("", async () => {});
        });
        describe("edit user password", () => {
            it("", async () => {});
        });
        describe("edit user email", () => {
            it("", async () => {});
        });
        describe("edit user role", () => {
            it("", async () => {});
        });
    });
});
