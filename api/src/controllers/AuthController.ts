import { NextFunction, Request, Response } from "express";
import ApiErrorException from "../exceptions/ApiErrorException";
import ResetPasswordRequest from "../models/ResetPasswordRequest.model";
import User from "../models/User.model";
import VerifyRequest from "../models/VerifyRequest.model";
import MailerService from "../services/MailerService";
import EditData from "../types/EditData";

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction) {
        const { email, name, surname, phoneNumber, password } = req.body;
        const data = await new User(email, name, surname, phoneNumber, password).createUser().catch(next);
        if (data) {
            const request = await VerifyRequest.create(data.id).catch(next)
            if (request) {
                MailerService.sendVerificationMail(email, request.id);
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
                .status(200).json({ message: "user logged in" });
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
            return res.json({message: "Password reseted successfully"});
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