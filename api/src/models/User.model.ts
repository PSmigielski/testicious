import jwt from "jsonwebtoken";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import ApiErrorException from "../exceptions/ApiErrorException";
import Model from "./Model";
import RefreshToken from './RefreshToken.model';
import ResetPasswordRequest from './ResetPasswordRequest.model';
import PrismaException from '../exceptions/PrismaException';
import VerifyRequest from "./VerifyRequest.model";
import IUser from "../types/IUser";

class User extends Model {
    private login: string;
    private plainPassword: string;
    private email: string;
    constructor(email: string, login: string, plainPassword: string) {
        super();
        this.email = email;
        this.login = login;
        this.plainPassword = plainPassword;
    }
    public async createUser() {
        const prisma = User.getPrisma();
        const salt = randomBytes(32).toString("hex"); //2chars at one byte
        const user = await prisma.user.create({
            data: {
                email: this.email,
                login: this.login,
                password: `${salt}:${scryptSync(this.plainPassword, salt, 64).toString("hex")}`
            }
        }).catch(err => { throw PrismaException.createException(err,"User") });     
        return user;
    }
    public static async login({ login, password }: { login: string, password: string }) {
        const user = await User.getUserByLogin(login);
        if (!user) {
            throw new ApiErrorException("Wrong credentials", 403);
        }
        if (!user.isVerified) {
            throw new ApiErrorException("user is not verified", 401);
        }
        if (!User.checkPassword(password,user)) {
            throw new ApiErrorException("Wrong credentials", 403);
        }
        const refreshToken = await new RefreshToken(user.id).createToken();
        const token = jwt.sign({ id: user.id, login, refTokenId: refreshToken.id }, process.env.JWT_SECRET as string, { expiresIn: 60 * 15 })
        const tokenData = jwt.decode(token);
        const refreshTokenData = jwt.decode(refreshToken.token);
        if (typeof tokenData != "string" && typeof refreshTokenData != "string") {
            return {
                jwt: { token, exp: tokenData?.exp },
                refreshToken: { token: refreshToken.token, exp: refreshTokenData?.exp }
            }
        }
    }
    public static async logout(refTokenId: string) {
        const refToken = await RefreshToken.deleteToken(refTokenId);
        return true;
    }
    public static async verify(id: string) {
        const prisma = User.getPrisma();
        const request = await VerifyRequest.getUniqueVerifyRequest(id);
        if (request) {
            const updatedUser = await prisma.user.update({
                where: { id: request.user?.id },
                data: { isVerified: true },
            }).catch(err => { throw PrismaException.createException(err,"User") });
            const deletedVerifyRequest = await VerifyRequest.delete(request.id);
            return true;
        } else {
            throw new ApiErrorException("request with this id does not exist", 404);
        }
    }
    public static async refreshBearerToken(token: string) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof decoded != "string") {
            const refTokens = await RefreshToken.getTokens(decoded.id); 
            const refToken = refTokens.find(el => el.token == token)
            if (refTokens.length === 0 || typeof refToken == "undefined") {
                throw new ApiErrorException("no refresh token found", 403);
            } else {
                const newToken: string = jwt.sign({ id: decoded.id, login: refToken.user?.login, refTokenId: refToken?.id }, process.env.JWT_SECRET as string, { expiresIn: 60 * 15 })
                const tokenData = jwt.decode(newToken);
                if (typeof tokenData != "string") {
                    return { token: newToken, exp: tokenData?.exp };
                }
            }
        }
    }
    public static async getUserById(userId: string) {
        const prisma = User.getPrisma();
        if(userId == undefined){
            throw new ApiErrorException("undefined user id", 404);
        }
        const user = await prisma.user.findUnique({
            where: { id: userId }
        }).catch(err => { throw PrismaException.createException(err,"User") });
        if (user == undefined) {
            throw new ApiErrorException("User with this id does not exist!", 404);
        } else {
            return user;
        }
    }
    public static async getUserByEmail(email: string) {
        const prisma = User.getPrisma();
        if(email == undefined){
            throw new ApiErrorException("undefined email", 404);
        }
        const user = await prisma.user.findUnique({
            where: { email }
        }).catch(err => { throw PrismaException.createException(err,"User") });
        return user;
    }
    public static async getUserByLogin(login: string) {
        const prisma = User.getPrisma();
        if(login == undefined){
            throw new ApiErrorException("undefined login", 404);
        }
        const user = await prisma.user.findUnique({
            where: { login }
        }).catch(err => { throw PrismaException.createException(err,"User") });
        return user;
    }
    public static async resetPassword(newPassword: string, requestId: string) {
        const prisma = User.getPrisma();
        const request = await ResetPasswordRequest.getRequest(requestId);
        if(request){
            const salt = randomBytes(32).toString("hex");
            const hashedPassword = `${salt}:${scryptSync(newPassword, salt, 64).toString("hex")}`;
            const result = await ResetPasswordRequest.removeRequest(requestId);
            const updatedUser = await prisma.user.update({
                data: { password: hashedPassword },
                where: { id:request?.userId }
            }).catch(err => { throw PrismaException.createException(err,"User") });
            return true;
        } else{
            return false;
        }
    }
    private static checkPassword(password:string, user: IUser ){
        const [salt, key] = user.password.split(":");
        const hashedBuffer = scryptSync(password, salt, 64);
        const keyBuffer = Buffer.from(key, 'hex');
        return timingSafeEqual(hashedBuffer, keyBuffer);
    }
    public static async editPassword(password: string,newPassword:string, userId:string){
        const prisma = User.getPrisma();
        const user = await User.getUserById(userId);
        if(!User.checkPassword(password, user)){
            throw new ApiErrorException("Wrong old password", 403);
        }
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = `${salt}:${scryptSync(newPassword, salt, 64).toString("hex")}`;
        await prisma.user.update({
            data: { password: hashedPassword },
            where: { id: userId }
        }).catch(err => { throw PrismaException.createException(err,"User") });
        return true;
    }
    public static async editLogin(login: string, userId: string){
        const prisma = User.getPrisma();
        await prisma.user.update({
            data: { login },
            where: { id: userId }
        }).catch(err => { throw PrismaException.createException(err,"User") });
        return true;
    }

}

export default User;