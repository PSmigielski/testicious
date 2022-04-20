import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import schemaValidator from "../middleware/schemaValidator";
import User from "../models/User.model";
import AuthService from "../services/AuthService";
import EditData from "../types/EditData";
import { Methods } from "../types/Methods";
import Roles from "../types/Roles";
import Controller from "./Controller";

class AuthController extends Controller {
    constructor() {
        super();
    }
    path = "/auth";
    routes = [
        {
            path: "/login",
            method: Methods.POST,
            handler: this.login,
            localMiddleware: [schemaValidator("/../../schemas/login.schema.json")],
        },
        {
            path: "/register",
            method: Methods.POST,
            handler: this.register,
            localMiddleware: [schemaValidator("/../../schemas/register.schema.json")],
        },
        {
            path: "/logout",
            method: Methods.POST,
            handler: this.logout,
            localMiddleware: [checkJwt],
        },
        {
            path: "/verify/:requestId",
            method: Methods.GET,
            handler: this.verify,
            localMiddleware: [checkUuid("requestId")],
        },
        {
            path: "/refresh",
            method: Methods.POST,
            handler: this.refreshBearerToken,
            localMiddleware: [],
        },
        {
            path: "/forget",
            method: Methods.POST,
            handler: this.sendResetRequest,
            localMiddleware: [schemaValidator("/../../schemas/forget.schema.json")],
        },
        {
            path: "/reset/:requestId",
            method: Methods.PUT,
            handler: this.reset,
            localMiddleware: [checkUuid("requestId"), schemaValidator("/../../schemas/reset.schema.json")],
        },
        {
            path: "/edit",
            method: Methods.PUT,
            handler: this.editAccountData,
            localMiddleware: [checkJwt, schemaValidator("/../../schemas/editAccount.schema.json")],
        },
        {
            path: "/edit/password",
            method: Methods.PUT,
            handler: this.editPassword,
            localMiddleware: [checkJwt, schemaValidator("/../../schemas/editPassword.schema.json")],
        },
        {
            path: "/edit/role/:id",
            method: Methods.PUT,
            handler: this.changeRole,
            localMiddleware: [
                checkUuid("id"),
                checkJwt,
                checkRole(Roles.ADMIN),
                schemaValidator("/../../schemas/changeRole.schema.json"),
            ],
        },
        {
            path: "/remove",
            method: Methods.DELETE,
            handler: this.removeAccount,
            localMiddleware: [checkJwt],
        },
    ];
    public async register(req: Request, res: Response, next: NextFunction) {
        const data = req.body;
        const user = await new AuthService().createAccount(data).catch(next);
        if (user) {
            return res.json({ message: "You are now registered! Check your email to verify your account" });
        }
    }
    public async verify(req: Request, res: Response, next: NextFunction) {
        const { requestId } = req.params;
        const result = await new AuthService().verify(requestId).catch(next);
        if (result) {
            return res.status(202).json({ message: "Email has been verified successfully" });
        }
    }
    public async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const result = await new AuthService().login({ email, password }).catch(next);
        if (result) {
            const tokenExp: Date = new Date();
            tokenExp.setTime((result.jwt.exp as number) * 1000);
            const refreshTokenExp = new Date();
            refreshTokenExp.setTime((result.refreshToken.exp as number) * 1000);
            return res
                .cookie("BEARER", result.jwt.token, {
                    httpOnly: true,
                    expires: tokenExp,
                    sameSite: "lax",
                })
                .cookie("REFRESH_TOKEN", result.refreshToken, {
                    httpOnly: true,
                    expires: refreshTokenExp,
                    sameSite: "lax",
                })
                .status(200)
                .json({
                    message: "user logged in",
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        role: result.user.role,
                    },
                });
        }
    }
    public async logout(req: Request, res: Response, next: NextFunction) {
        const result = await new AuthService().logout(req.user?.refTokenId).catch(next);
        if (result) {
            req.user = undefined;
            return res
                .clearCookie("BEARER")
                .clearCookie("REFRESH_TOKEN")
                .status(202)
                .json({ message: "user logged out successfully" });
        }
    }
    public async refreshBearerToken(req: Request, res: Response, next: NextFunction) {
        if (req.cookies.REFRESH_TOKEN != undefined) {
            const newToken = await new AuthService().refreshBearerToken(req.cookies.REFRESH_TOKEN.token).catch(next);
            if (newToken !== undefined) {
                const tokenExp: Date = new Date();
                tokenExp.setTime((newToken?.exp as number) * 1000);
                return res
                    .cookie("BEARER", newToken?.token, { httpOnly: true, expires: tokenExp })
                    .status(200)
                    .json({ message: "token has been refreshed" });
            }
        } else {
            return next(new ApiErrorException("REFRESH_TOKEN cookie not found", 401));
        }
    }
    public async sendResetRequest(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        const result = await new AuthService().sendResetRequest(email).catch(next);
        if (result) {
            return res.json({ message: "reset request has been sent" });
        }
    }
    public async reset(req: Request, res: Response, next: NextFunction) {
        const { newPassword } = req.body;
        const { requestId } = req.params;
        const result = await new AuthService().resetPassword(newPassword, requestId).catch(next);
        if (result) {
            return res.json({ message: "Password reset successfully" });
        }
    }
    public async editAccountData(req: Request, res: Response, next: NextFunction) {
        const data: EditData = req.body;
        const result = await User.editAccountData(data, req.user?.id);
        if (result) {
            return res.status(202).json({ message: "Your account details has been edited", data: result });
        }
    }
    public async editPassword(req: Request, res: Response, next: NextFunction) {
        const { password, newPassword } = req.body;
        const result = await new AuthService().editPassword(password, newPassword, req.user?.id).catch(next);
        if (result) {
            return res.status(202).json({ message: "password updated successfully" });
        }
    }
    public async changeRole(req: Request, res: Response, next: NextFunction) {
        const { role } = req.body;
        if (req.params.id == req.user?.id) {
            return next(new ApiErrorException("You can't change your own role", 403));
        } else {
            const result = await User.changeRole(role, req.params.id).catch(next);
            if (result) {
                return res.status(202).json({ message: `User role has been changed to ${role}` });
            }
        }
    }
    public async removeAccount(req: Request, res: Response, next: NextFunction) {
        const removedUser = await User.remove(req.user?.id).catch(next);
        if (removedUser) {
            return res.status(202).json({ message: "User has been removed" });
        }
    }
}
export default AuthController;
