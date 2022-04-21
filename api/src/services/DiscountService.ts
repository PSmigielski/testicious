import Discount from "../models/Discount.model";
import User from "../models/User.model";
import IDiscount from "../types/IDiscount";
import MailerService from "./MailerService";

class DiscountService {
    public async create(data: IDiscount){
        const discount = await new Discount(data).create().catch(err=> {
            throw err;
        });
        if (discount) {
            const users = await User.getUserMails().catch(err => {
                throw err;
            });
            if (Array.isArray(users)) {
                MailerService.sendDiscount(users, discount.code, discount.precent, discount.expirationDate);
            }
            return discount;
        }
    }
}

export default DiscountService;