import { PrismaClient } from ".prisma/client";
import nodemailer from "nodemailer";
import IMailContent from "../types/IMailContent";
class MailerService {
    public static async sendMail(mailContent: IMailContent) {
        const prisma: PrismaClient = new PrismaClient();
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASSWORD
            },
        });
        let info = await transporter.sendMail(mailContent);
    }
    public static sendVerificationMail(email: string, id: string){
        MailerService.sendMail({
            from: "Pepper Pizza",
            to: email,
            subject: "Verify your account",
            html: `<h1>Hi!</h1>
            <p> To verify your email, please visit the following <a href="${process.env.HOSTNAME}:${process.env.PORT}/v1/api/auth/verify/${id}" >link</a></p>
            <br><p> Cheers! </p>`,
        });
    }
    public static sendResetRequest(email:string, id: string){
        MailerService.sendMail({
            from: "Pepper Pizza",
            to: email,
            subject: "Reset your password",
            html: `<h1>Hi!</h1>
            <p> To reset your password, please visit the following <a href="${process.env.HOSTNAME}:${process.env.PORT}/v1/api/auth/reset/${id}" >link</a></p>
            <br><p> Cheers! </p>`,
        });
    }
}

export default MailerService