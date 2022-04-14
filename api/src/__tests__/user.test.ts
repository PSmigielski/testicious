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
import AuthService from "../services/AuthService";

const controllers = [new AuthController()];
const globalMiddleware = [cookieParser(), json(), cors({ credentials: true, origin: process.env.FRONTEND_URL })];
const errorHandlers = [prismaErrorHandler, errorHandler];
const app = new Server(controllers, globalMiddleware, errorHandlers).getApp();
const prisma = new PrismaClient();
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
    describe("login", () => {
        it("should login successfully", async () => {
            const { statusCode, headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
            expect(statusCode).toBe(200);
            expect(headers["set-cookie"].length).toBe(2);
        });
        it("should fail if user pass wrong credentials", async () => {
            const { statusCode, body } = await supertest(app)
                .post("/v1/api/auth/login")
                .send({ ...userLoginInput, email: "fail@gmail.com" });
            expect(statusCode).toBe(401);
            expect(body).toStrictEqual({
                error: "Wrong credentials",
            });
        });
        it("should fail if user is not verified", async () => {
            const user = await new User(userRegisterInput).create();
            const { statusCode, body } = await supertest(app)
                .post("/v1/api/auth/login")
                .send({ email: userRegisterInput.email, password: userRegisterInput.password });
            expect(statusCode).toBe(401);
            expect(body).toStrictEqual({ error: "user is not verified" });
            //@ts-ignore
            await User.remove(user.id);
        });
        it("should fail if user does not pass any data", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/auth/login");
            expect(statusCode).toBe(400);
        });
    });
    describe("register", () => {
        it("should fail if user does not pass valid data", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/auth/register");
            expect(statusCode).toBe(400);
        });
        it("should fail if user pass email that is present in database", async () => {
            const { statusCode } = await supertest(app)
                .post("/v1/api/auth/register")
                .send({ ...userRegisterInput, email: "admin@pizzaPolaka.com" });
            expect(statusCode).toBe(409);
        });
        it("should register successfully if user pass correct data", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/auth/register").send(userRegisterInput);
            expect(statusCode).toBe(200);
            await prisma.user.delete({ where: { email: userRegisterInput.email } });
        });
    });
    describe("logout", () => {
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
        it("should fail if no refresh token cookie found", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/auth/refresh");
            expect(statusCode).toBe(401);
        });
        it("should fail if no refresh token is not jwt", async () => {
            const { statusCode } = await supertest(app)
                .post("/v1/api/auth/refresh")
                .set("Cookie", "REFRESH_TOKEN=fail.fail.fail; Path=/; Expires=Sun, 12 Jun 2022 11:34:09 GMT; HttpOnly");
            expect(statusCode).toBe(500);
        });
        it("should fail if no refresh token is not found in database", async () => {
            const { statusCode, body } = await supertest(app)
                .post("/v1/api/auth/refresh")
                .set(
                    "Cookie",
                    "REFRESH_TOKEN=j%3A%7B%22token%22%3A%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzNjZkNmZjLTdiMGQtNDNjZC04NWFjLTExZTVhMTA0YTZmOCIsImlhdCI6MTY0OTg0OTY0OSwiZXhwIjoxNjU1MDMzNjQ5fQ.pqmDDZDJXgiMBeV7jupV6CVnlJt6A8xcA8eEBQLkDO8%22%2C%22exp%22%3A1655033649%7D; Path=/; Expires=Sun, 12 Jun 2022 11:34:09 GMT; HttpOnly",
                );
            expect(statusCode).toBe(401);
        });
        it("should refresh successfully if all conditions are met", async () => {
            const loginData = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
            const { statusCode, headers } = await supertest(app)
                .post("/v1/api/auth/refresh")
                .set("Cookie", loginData.headers["set-cookie"][1]);
            expect(statusCode).toBe(200);
            expect(headers["set-cookie"].length).toBe(1);
        });
    });
    describe("verify", () => {
        it("should fail if request has invalid request uuid", async () => {
            const id = "fail";
            const { statusCode } = await supertest(app).get(`/v1/api/auth/verify/${id}`);
            expect(statusCode).toBe(400);
        });
        it("should fail if verify request does not exist", async () => {
            const id = "e366d6fc-7b0d-43cd-85ac-11e5a104a6f8";
            const { statusCode } = await supertest(app).get(`/v1/api/auth/verify/${id}`);
            expect(statusCode).toBe(404);
        });
        it("should verify successfully if everything is valid", async () => {
            const data = await supertest(app).post("/v1/api/auth/register").send(userRegisterInput);
            const user = await prisma.user.findUnique({
                where: { email: userRegisterInput.email },
                select: { VerifyRequest: { select: { id: true } } },
            });
            const { statusCode, body } = await supertest(app).get(`/v1/api/auth/verify/${user?.VerifyRequest?.id}`);
            expect(statusCode).toBe(202);
            await prisma.user.delete({ where: { email: userRegisterInput.email } });
        });
    });
    describe("send reset password request", () => {
        it("should fail if user does not exist", async () => {
            const { statusCode } = await supertest(app).post("/v1/api/auth/forget").send({ email: "dont@exist.com" });
            expect(statusCode).toBe(404);
        });
        it("should send password reset request successfully if all conditions are met", async () => {
            const { statusCode } = await supertest(app)
                .post("/v1/api/auth/forget")
                .send({ email: "admin@pizzaPolaka.com" });
            expect(statusCode).toBe(200);
        });
        it("should fail if reset password request for user exist in database", async () => {
            const { statusCode } = await supertest(app)
                .post("/v1/api/auth/forget")
                .send({ email: "admin@pizzaPolaka.com" });
            expect(statusCode).toBe(409);

            const user = await prisma.user.findUnique({ where: { email: "admin@pizzaPolaka.com" } });
            await prisma.resetPasswordRequest.delete({ where: { userId: user?.id } });
        });
    });
    describe("reset password", () => {
        it("should fail if request id is not a uuid", async () => {
            const { statusCode, body } = await supertest(app).put("/v1/api/auth/reset/fail");
            console.log(body);
            expect(statusCode).toBe(400);
        });
        it("should fail if password is not provided in request body", async () => {
            const id = "e366d6fc-7b0d-43cd-85ac-11e5a104a6f8";
            const { statusCode } = await supertest(app).put(`/v1/api/auth/reset/${id}`);
            expect(statusCode).toBe(400);
        });
        it("should fail if request does not exist in database", async () => {
            const id = "e366d6fc-7b0d-43cd-85ac-11e5a104a6f8";
            const { statusCode } = await supertest(app)
                .put(`/v1/api/auth/reset/${id}`)
                .send({ newPassword: "0O9i8u7y!" });
            expect(statusCode).toBe(404);
        });
        it("should  reset request successfully if all conditions are met", async () => {
            const data = await supertest(app).post("/v1/api/auth/forget").send({ email: "admin@pizzaPolaka.com" });
            const user = await prisma.user.findUnique({ where: { email: "admin@pizzaPolaka.com" } });
            const request = await prisma.resetPasswordRequest.findUnique({ where: { userId: user?.id } });
            const { statusCode } = await supertest(app)
                .put(`/v1/api/auth/reset/${request?.id}`)
                .send({ newPassword: "0O9i8u7y!" });
            expect(statusCode).toBe(200);
        });
    });
    describe("edit", () => {
        describe("edit user data", () => {
            it("should fail if user is not logged in", async () => {
                const { statusCode } = await supertest(app).put("/v1/api/auth/edit");
                expect(statusCode).toBe(401);
            });
            it("should fail if no data is provided", async () => {
                const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
                const { statusCode } = await supertest(app)
                    .put("/v1/api/auth/edit")
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(400);
            });
            it("should edit user data successfully if all conditions are met", async () => {
                const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
                const { statusCode } = await supertest(app)
                    .put("/v1/api/auth/edit")
                    .send({ name: "Admin" })
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(202);
            });
        });
        describe("edit user password", () => {
            it("should fail if user is not logged in", async () => {
                const { statusCode } = await supertest(app).put("/v1/api/auth/edit/password");
                expect(statusCode).toBe(401);
            });
            it("should fail if no data is provided", async () => {
                const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
                const { statusCode } = await supertest(app)
                    .put("/v1/api/auth/edit/password")
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(400);
            });
            it("should fail if old password is wrong", async () => {
                const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
                const { statusCode } = await supertest(app)
                    .put("/v1/api/auth/edit/password")
                    .send({ password: "0o9i8u7y", newPassword: "0O9i8u7y!" })
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(403);
            });
            it("should edit password successfully if all conditions are met", async () => {
                const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
                const { statusCode } = await supertest(app)
                    .put("/v1/api/auth/edit/password")
                    .send({ password: "0O9i8u7y!", newPassword: "0O9i8u7y!" })
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(202);
            });
        });
        describe("edit user role", () => {
            it("should fail if user id is not a uuid", async () => {
                const { statusCode } = await supertest(app).put("/v1/api/auth/edit/role/fail");
                expect(statusCode).toBe(400);
            });
            it("should fail if user is not logged in", async () => {
                const id = "e366d6fc-7b0d-43cd-85ac-11e5a104a6f8";
                const { statusCode } = await supertest(app).put(`/v1/api/auth/edit/role/${id}`);
                expect(statusCode).toBe(401);
            });
            it("should fail if user id does not exist in database", async () => {
                const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
                const { statusCode } = await supertest(app)
                    .put("/v1/api/auth/edit/role/e366d6fc-7b0d-43cd-85ac-11e5a104a6f7")
                    .send({ role: "ADMIN" })
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(404);
            });
            it("should fail if no data is provided", async () => {
                const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
                const { statusCode } = await supertest(app)
                    .put("/v1/api/auth/edit/role/e366d6fc-7b0d-43cd-85ac-11e5a104a6f8")
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(400);
            });
            it("should fail if wrong role given", async () => {
                const { headers } = await supertest(app).post("/v1/api/auth/login").send(userLoginInput);
                const { statusCode } = await supertest(app)
                    .put("/v1/api/auth/edit/role/e366d6fc-7b0d-43cd-85ac-11e5a104a6f8")
                    .send({ role: "FAIL" })
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(400);
            });
            it("should fail if user is not an admin", async () => {
                const { headers } = await supertest(app)
                    .post("/v1/api/auth/login")
                    .send({ email: "user@pizzaPolaka.com", password: "0O9i8u7y!" });
                const { statusCode } = await supertest(app)
                    .put("/v1/api/auth/edit/role/a2813c46-b0b4-404e-8de4-c17645f407c0")
                    .send({ role: "USER" })
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(403);
            });
            it("should change role successfully if all conditions are met", async () => {
                const { headers } = await supertest(app)
                    .post("/v1/api/auth/login")
                    .send({ email: "admin@pizzaPolaka.com", password: "0O9i8u7y!" });
                const user = await prisma.user.findUnique({ where: { email: "user@pizzaPolaka.com" } });
                const { statusCode } = await supertest(app)
                    .put(`/v1/api/auth/edit/role/${user?.id}`)
                    .send({ role: "USER" })
                    .set("Cookie", headers["set-cookie"]);
                expect(statusCode).toBe(202);
            });
        });
    });
    describe("remove", () => {
        it("should fail if user is not logged in", async () => {
            const { statusCode } = await supertest(app).delete("/v1/api/auth/remove").send(userRegisterInput);
            expect(statusCode).toBe(401);
        });
        it("should remove account successfully if all conditions are met", async () => {
            const res = await new AuthService().createAccount(userRegisterInput);
            const user = await prisma.user.findUnique({
                where: { email: userRegisterInput.email },
                select: { VerifyRequest: { select: { id: true } } },
            });
            const data = await supertest(app).get(`/v1/api/auth/verify/${user?.VerifyRequest?.id}`);
            const { headers } = await supertest(app)
                .post("/v1/api/auth/login")
                .send({ email: userRegisterInput.email, password: userRegisterInput.password });
            const { statusCode } = await supertest(app)
                .delete("/v1/api/auth/remove")
                .set("Cookie", headers["set-cookie"]);
            expect(statusCode).toBe(202);
        });
    });
});
