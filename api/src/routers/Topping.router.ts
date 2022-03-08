import express from "express";
import ToppingController from "../controllers/ToppingController";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import schemaValidator from "../middleware/schemaValidator";
import Roles from "../types/Roles";

const toppingController = new ToppingController();
const toppingRouter = express.Router();

toppingRouter.post("", checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/topping.schema.json"), toppingController.create.bind(toppingController));
toppingRouter.get("", checkJwt, checkRole(Roles.ADMIN), toppingController.show.bind(toppingController));

export default toppingRouter;