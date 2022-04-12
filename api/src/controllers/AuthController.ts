import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import schemaValidator from "../middleware/schemaValidator";
import Cart from "../models/Cart.model";
import ResetPasswordRequest from "../models/ResetPasswordRequest.model";
import User from "../models/User.model";
import VerifyRequest from "../models/VerifyRequest.model";
import MailerService from "../services/MailerService";
import EditData from "../types/EditData";
import { Methods } from "../types/Methods";
import Roles from "../types/Roles";
import Controller from "./Controller";

class AuthController extends Controller{
    constructor(){
        super();
    }
    path = "/auth";
    routes = [
        {
            path: '/login',
            method: Methods.POST,
            handler: this.login,
            localMiddleware: [schemaValidator("/../../schemas/login.schema.json")]
        },
        {
            path: '/register',
            method: Methods.POST,
            handler: this.register,
            localMiddleware: [schemaValidator("/../../schemas/register.schema.json")]
        },
        {
            path: '/logout',
            method: Methods.POST,
            handler: this.logout,
            localMiddleware: [checkJwt]
        },
        {
            path: '/verify/:requestId',
            method: Methods.POST,
            handler: this.verify,
            localMiddleware: [checkUuid("requestId")]
        },
        {
            path: '/refresh',
            method: Methods.POST,
            handler: this.refreshBearerToken,
            localMiddleware: []
        },
        {
            path: '/forget',
            method: Methods.POST,
            handler: this.sendResetRequest,
            localMiddleware: [schemaValidator("/../../schemas/forget.schema.json")]
        },
        {
            path: '/reset/:requestId',
            method: Methods.POST,
            handler: this.reset,
            localMiddleware: [checkUuid("requestId"), schemaValidator("/../../schemas/reset.schema.json")]
        },
        {
            path: '/edit',
            method: Methods.POST,
            handler: this.editAccountData,
            localMiddleware: [checkJwt, schemaValidator("/../../schemas/editAccount.schema.json")]
        },
        {
            path: '/edit/password',
            method: Methods.POST,
            handler: this.editPassword,
            localMiddleware: [checkJwt, schemaValidator("/../../schemas/editPassword.schema.json")]
        },
        {
            path: '/edit/role/:id',
            method: Methods.POST,
            handler: this.changeRole,
            localMiddleware: [checkJwt, checkRole(Roles.ADMIN), checkUuid("id"),schemaValidator("/../../schemas/changeRole.schema.json")]
        },

    ];
    public async register(req: Request, res: Response, next: NextFunction) {
        const data = req.body;
        const user = await new User(data).createUser().catch(next);
        if (user) {
            await new Cart(user.id).create().catch(next);
            const request = await VerifyRequest.create(user.id).catch(next)
            if (request) {
                MailerService.sendVerificationMail(user.email, request.id);
                return res.json({message: "You are now registered! Check your email to verify your account"});
            }
        }
    }
    public async verify(req: Request, res: Response, next: NextFunction) {
        const { requestId } = req.params;
        const result = await User.verify(requestId).catch(next);
        if (result) {
            return res.status(202).json({ message: "Email has been verified successfully" })
        }
    }
    public async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const result = await User.login({ email, password }).catch(next);
        if (result) {
            const tokenExp: Date = new Date();
            tokenExp.setTime(result.jwt.exp as number * 1000);
            const refreshTokenExp = new Date()
            refreshTokenExp.setTime(result.refreshToken.exp as number * 1000);
            return res
                .cookie("BEARER", result.jwt.token, { httpOnly: true, expires: tokenExp })
                .cookie("REFRESH_TOKEN", result.refreshToken, { httpOnly: true, expires: refreshTokenExp })
                .status(200).json({ message: "user logged in", user: {
                    id: result.user.id,
                    email: result.user.email,
                    role: result.user.role
                }});
        }
    }
    public async logout(req: Request, res: Response, next: NextFunction) {
        const result = await User.logout(req.user?.refTokenId).catch(next);
        if (result) {
            req.user = undefined;
            return res.clearCookie("BEARER").clearCookie("REFRESH_TOKEN").status(202).json({ message: "user logged out successfully" });
        }
    }
    public async refreshBearerToken(req: Request, res: Response, next: NextFunction) {
        if (req.cookies.REFRESH_TOKEN != undefined) {
            const newToken = await User.refreshBearerToken(req.cookies.REFRESH_TOKEN.token).catch(next)
            if (newToken !== undefined) {
                const tokenExp: Date = new Date();
                tokenExp.setTime(newToken?.exp as number * 1000);
                return res
                    .cookie("BEARER", newToken?.token, { httpOnly: true, expires: tokenExp })
                    .status(200).json({ message: "token has been refreshed" });
            }
        } else {
            return next(new ApiErrorException("REFRESH_TOKEN cookie not found", 401));
        }
    }
    public async sendResetRequest(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        const user = await User.getUserByEmail(email).catch(next);
        if (user) {
            const request = await ResetPasswordRequest.create(user.id).catch(next)
            if (request) {
                MailerService.sendResetRequest(email, request.id);
                return res.json({ message: "reset request has been sent" });
            }
        }else{
            next(new ApiErrorException("User with this email does not exist!", 404));
        }
    }
    public async reset(req: Request, res: Response, next: NextFunction) {
        const { newPassword } = req.body;
        const { requestId } = req.params
        const result = await User.resetPassword(newPassword, requestId).catch(next);
        if(result){
            return res.json({message: "Password reset successfully"});
        }
    }
    public async editAccountData(req: Request, res: Response, next: NextFunction){
        const data: EditData = req.body;
        const result = await User.editAccountData(data, req.user?.id);
        if(result){
            return res.status(202).json({ message: "Your account details has been edited", data: result });
        }
    }
    public async editPassword(req: Request, res: Response, next: NextFunction){
        const { password, newPassword } = req.body;
        const result = await User.editPassword(password,newPassword, req.user?.id).catch(next); 
        if(result){
            return res.status(202).json({message: "password updated successfully"});
        }
    }
    public async changeRole(req: Request, res: Response, next: NextFunction){
        const { role } =  req.body;
        if(req.params.id == req.user?.id){
            return next(new ApiErrorException("You can't change your own role", 403));
        } else {
            const result = await User.changeRole(role, req.params.id).catch(next);
            if(result){
                return res.status(202).json({message: `User role has been changed to ${role}`})
            }
        }
    }
}
export default AuthController;