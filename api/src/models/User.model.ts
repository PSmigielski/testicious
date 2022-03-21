import jwt from "jsonwebtoken";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import ApiErrorException from "../exceptions/ApiErrorException";
import Model from "./Model";
import RefreshToken from './RefreshToken.model';
import ResetPasswordRequest from './ResetPasswordRequest.model';
import PrismaException from '../exceptions/PrismaException';
import VerifyRequest from "./VerifyRequest.model";
import IUser from "../types/IUser";
import EditData from "../types/EditData";
import Roles from "../types/Roles";

class User extends Model {
    private name: string;
    private surname: string;
    private phoneNumber: string;
    private plainPassword: string;
    private email: string;
    private city: string;
    private homeNumber: number | undefined;
    private buildingNumber: number;
    private street: string;
    constructor({ email, name, surname, phoneNumber, password, street, homeNumber,  buildingNumber, city}: IUser ) {
        super();
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.plainPassword = password;
        this.city = city,
        this.street = street,
        this.homeNumber = homeNumber ? homeNumber : undefined,
        this.buildingNumber = buildingNumber
    }
    public async createUser() {
        const prisma = User.getPrisma();
        const salt = randomBytes(32).toString("hex"); //2chars at one byte
        const user = await prisma.user.create({
            data: {
                email: this.email,
                name: this.name,
                surname: this.surname,
                phoneNumber: this.phoneNumber,
                password: `${salt}:${scryptSync(this.plainPassword, salt, 64).toString("hex")}`,
                street: this.street,
                buildingNumber: this.buildingNumber,
                city: this.city,
                homeNumber: this.homeNumber
            }
        }).catch(err => { throw PrismaException.createException(err,"User") });     
        return user;
    }
    public static async login({ email, password }: { email: string, password: string }) {
        const user = await User.getUserByEmail(email);
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
        const token = jwt.sign({ id: user.id, email, role: user.role, refTokenId: refreshToken.id }, process.env.JWT_SECRET as string, { expiresIn: 60 * 15 })
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
                const newToken: string = jwt.sign({ id: decoded.id, email: refToken.user?.email, role: refToken.user?.role, refTokenId: refToken?.id }, process.env.JWT_SECRET as string, { expiresIn: 60 * 15 })
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
    public static async editAccountData(data: EditData , userId: string){
        const prisma = User.getPrisma();
        return await prisma.user.update({
            data,
            where: { id: userId },
            select: {
                id: true,
                name: true,
                surname: true,
                phoneNumber: true,
                email: true,
                city: true,
                street: true,
                buildingNumber: true,
                homeNumber: true
            }
        }).catch(err => { throw PrismaException.createException(err,"User") });
    }
    public static async changeRole(role: Roles, userId: string){
        const prisma = User.getPrisma();
        return await prisma.user.update({
            data: { role },
            where: { id: userId }
        }).catch(err => { throw PrismaException.createException(err,"User") });
    }
    public static async getUserMails(){
        const prisma = User.getPrisma();
        const users = await prisma.user.findMany({select: {email: true}, where: {role: "USER", isVerified: true}})
        .catch(err => { throw PrismaException.createException(err,"User") });
        const emails = users.map(el => el.email)
        return emails;
    }
}

export default User;