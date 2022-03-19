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
            subject: "Zweryfikuj swoje konto",
            html: `<h1>Cześć</h1>
            <p>Żeby zweryfikować swoje konto kliknij w ten  <a href="${process.env.HOSTNAME}:${process.env.PORT}/v1/api/auth/verify/${id}" >link</a></p>
            <br><p> Pozdro! </p>`,
        });
    }
    public static sendResetRequest(email:string, id: string){
        MailerService.sendMail({
            from: "Pepper Pizza",
            to: email,
            subject: "Zresetuj swoje hasło",
            html: `<h1>Cześć</h1>
            <p> Żeby zresetować zwoje hasło, kliknij w ten <a href="${process.env.HOSTNAME}:${process.env.PORT}/v1/api/auth/reset/${id}" >link</a></p>
            <br><p> Pozdro! </p>`,
        });
    }
    public static sendDiscount(emailList: string[], code: string, precent: number ,expDate: Date){
        const day = expDate.getDate()/10 < 1 ? `0${expDate.getDate()}` :  `${expDate.getDate()}`
        const month = (expDate.getMonth()+1)/10 < 1 ? `0${expDate.getMonth()+1}` :  `${expDate.getMonth()+1}`
        const year = expDate.getFullYear()
        MailerService.sendMail({
            from: "Pepper Pizza",
            to: emailList,
            subject: "Kod promcyjny",
            html: `<h1>Cześć</h1>
            <p>Własnie dodaliśmy nowy kod promocyjny: ${code} na -${precent}% na wszystkie produkty, ważny do ${day}.${month}.${year}</p>
            <br><p> Pozdro! </p>`
        })
    }
}

export default MailerService