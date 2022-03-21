import express from "express";
import DiscountController from "../controllers/DiscountController";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import schemaValidator from "../middleware/schemaValidator";
import Roles from "../types/Roles";

const discountRouter = express.Router();
const discountController = new DiscountController();

discountRouter.get("", checkJwt, checkRole(Roles.ADMIN), discountController.fetchAll.bind(discountController));
discountRouter.post("", checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/discount.schema.json"),discountController.create.bind(discountController));
discountRouter.put("/:discountId", checkJwt, checkRole(Roles.ADMIN), checkUuid("discountId"), schemaValidator("/../../schemas/discountUpdate.schema.json"),discountController.edit.bind(discountController));
discountRouter.delete("/:discountId", checkJwt, checkRole(Roles.ADMIN), checkUuid("discountId"), discountController.remove.bind(discountController));

export default discountRouter;