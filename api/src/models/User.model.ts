import ApiErrorException from "../exceptions/ApiErrorException";
import Model from "./Model";
import PrismaException from "../exceptions/PrismaException";
import IUser from "../types/IUser";
import EditData from "../types/EditData";
import Roles from "../types/Roles";

class User extends Model {
    private name: string;
    private surname: string;
    private phoneNumber: string;
    private password: string;
    private email: string;
    private city: string;
    private homeNumber: number | undefined;
    private buildingNumber: number;
    private street: string;
    constructor({ email, name, surname, phoneNumber, password, street, homeNumber, buildingNumber, city }: IUser) {
        super();
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.password = password;
        (this.city = city),
            (this.street = street),
            (this.homeNumber = homeNumber ? homeNumber : undefined),
            (this.buildingNumber = buildingNumber);
    }
    public async create() {
        const prisma = User.getPrisma();
        const user = await prisma.user
            .create({
                data: {
                    email: this.email,
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber,
                    password: this.password,
                    street: this.street,
                    buildingNumber: this.buildingNumber,
                    city: this.city,
                    homeNumber: this.homeNumber,
                },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "User");
            });
        return user;
    }
    public static async verify(id: string) {
        const prisma = User.getPrisma();
        await prisma.user
            .update({
                where: { id },
                data: { isVerified: true },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "User");
            });
        return true;
    }
    public static async getUserById(userId: string) {
        const prisma = User.getPrisma();
        if (userId == undefined) {
            throw new ApiErrorException("undefined user id", 404);
        }
        const user = await prisma.user
            .findUnique({
                where: { id: userId },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "User");
            });
        if (user == undefined) {
            throw new ApiErrorException("User with this id does not exist!", 404);
        } else {
            return user;
        }
    }
    public static async getUserByEmail(email: string) {
        const prisma = User.getPrisma();
        if (email == undefined) {
            throw new ApiErrorException("undefined email", 404);
        }
        const user = await prisma.user
            .findUnique({
                where: { email },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "User");
            });
        return user;
    }
    public static async editPassword(password: string, id: string) {
        const prisma = User.getPrisma();
        const updatedUser = await prisma.user
            .update({
                data: { password },
                where: { id },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "User");
            });
        return true;
    }
    public static async editAccountData(data: EditData, userId: string) {
        const prisma = User.getPrisma();
        return await prisma.user
            .update({
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
                    homeNumber: true,
                },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "User");
            });
    }
    public static async changeRole(role: Roles, userId: string) {
        const prisma = User.getPrisma();
        return await prisma.user
            .update({
                data: { role },
                where: { id: userId },
            })
            .catch((err) => {
                throw PrismaException.createException(err, "User");
            });
    }
    public static async getUserMails() {
        const prisma = User.getPrisma();
        const users = await prisma.user
            .findMany({ select: { email: true }, where: { role: "USER", isVerified: true } })
            .catch((err) => {
                throw PrismaException.createException(err, "User");
            });
        const emails = users.map((el) => el.email);
        return emails;
    }
    public static async remove(id: string) {
        const prisma = User.getPrisma();
        const removedUser = await prisma.user.delete({ where: { id } }).catch((err) => {
            throw PrismaException.createException(err, "User");
        });
        return removedUser;
    }
}

export default User;
