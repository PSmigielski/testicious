import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import ApiErrorException from "../exceptions/ApiErrorException";
import Cart from "../models/Cart.model";
import RefreshToken from "../models/RefreshToken.model";
import User from "../models/User.model";
import VerifyRequest from "../models/VerifyRequest.model";
import IUser from "../types/IUser";
import MailerService from "./MailerService";
import jwt from "jsonwebtoken";
import ResetPasswordRequest from "../models/ResetPasswordRequest.model";

class AuthService {
    public async createAccount(data: IUser) {
        const salt = randomBytes(32).toString("hex");
        const password = `${salt}:${scryptSync(data.password, salt, 64).toString("hex")}`;
        const user = await new User({ ...data, password }).create().catch((err) => {
            throw err;
        });
        if (user) {
            await new Cart(user.id).create().catch((err) => {
                throw err;
            });
            const request = await VerifyRequest.create(user.id).catch((err) => {
                throw err;
            });
            if (request) {
                await MailerService.sendVerificationMail(user.email, request.id);
            }
            return true;
        }
    }
    private checkPassword(password: string, user: IUser) {
        const [salt, key] = user.password.split(":");
        const hashedBuffer = scryptSync(password, salt, 64);
        const keyBuffer = Buffer.from(key, "hex");
        return timingSafeEqual(hashedBuffer, keyBuffer);
    }
    public async login({ email, password }: { email: string; password: string }) {
        const user = await User.getUserByEmail(email);
        if (!user) {
            throw new ApiErrorException("Wrong credentials", 401);
        }
        if (!user.isVerified) {
            throw new ApiErrorException("user is not verified", 401);
        }
        if (!this.checkPassword(password, user)) {
            throw new ApiErrorException("Wrong credentials", 401);
        }
        const refreshToken = await new RefreshToken(user.id).createToken().catch((err) => {
            throw err;
        });
        const token = jwt.sign(
            { id: user.id, email, role: user.role, refTokenId: refreshToken.id },
            process.env.JWT_SECRET as string,
            { expiresIn: 60 * 15 },
        );
        const tokenData = jwt.decode(token);
        const refreshTokenData = jwt.decode(refreshToken.token);
        if (typeof tokenData != "string" && typeof refreshTokenData != "string") {
            return {
                user,
                jwt: { token, exp: tokenData?.exp },
                refreshToken: { token: refreshToken.token, exp: refreshTokenData?.exp },
            };
        }
    }
    public async logout(refTokenId: string) {
        const refToken = await RefreshToken.deleteToken(refTokenId);
        return true;
    }
    public async verify(requestId: string) {
        const request = await VerifyRequest.getUniqueVerifyRequest(requestId).catch((err) => {
            throw err;
        });
        if (request) {
            await User.verify(request?.userId).catch((err) => {
                throw err;
            });
            const deletedVerifyRequest = await VerifyRequest.delete(request.id);
            return true;
        } else {
            throw new ApiErrorException("request with this id does not exist", 404);
        }
    }
    public async refreshBearerToken(token: string) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof decoded != "string") {
            const refTokens = await RefreshToken.getTokens(decoded.id).catch((err) => {
                throw err;
            });
            const refToken = refTokens.find((el) => el.token == token);
            if (refTokens.length === 0 || typeof refToken == "undefined") {
                throw new ApiErrorException("no refresh token found", 401);
            } else {
                const newToken: string = jwt.sign(
                    {
                        id: decoded.id,
                        email: refToken.user?.email,
                        role: refToken.user?.role,
                        refTokenId: refToken?.id,
                    },
                    process.env.JWT_SECRET as string,
                    { expiresIn: 60 * 15 },
                );
                const tokenData = jwt.decode(newToken);
                if (typeof tokenData != "string") {
                    return { token: newToken, exp: tokenData?.exp };
                }
            }
        }
    }
    public async sendResetRequest(email: string) {
        const user = await User.getUserByEmail(email).catch((err) => {
            throw err;
        });
        if (user) {
            const request = await ResetPasswordRequest.create(user.id).catch((err) => {
                throw err;
            });
            if (request) {
                MailerService.sendResetRequest(email, request.id);
                return true;
            }
        } else {
            throw new ApiErrorException("User with this email does not exist!", 404);
        }
    }
    public async resetPassword(newPassword: string, requestId: string) {
        const request = await ResetPasswordRequest.getRequest(requestId);
        if (request) {
            const salt = randomBytes(32).toString("hex");
            const hashedPassword = `${salt}:${scryptSync(newPassword, salt, 64).toString("hex")}`;
            const result = await ResetPasswordRequest.removeRequest(requestId).catch((err) => {
                throw err;
            });
            await User.editPassword(hashedPassword, request.userId);
            return true;
        }
    }
    public async editPassword(password: string, newPassword: string, userId: string) {
        const user = await User.getUserById(userId).catch((err) => {
            throw err;
        });
        if (!this.checkPassword(password, user)) {
            throw new ApiErrorException("Wrong old password", 403);
        }
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = `${salt}:${scryptSync(newPassword, salt, 64).toString("hex")}`;
        await User.editPassword(hashedPassword, user.id);
        return true;
    }
}

export default AuthService;
