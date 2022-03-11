import express from "express";
import ItemController from "../controllers/ItemController";
import checkJwt from "../middleware/checkJwt";

const itemController = new ItemController();
const itemRouter = express.Router();

itemRouter.post("/:cartId/:pizzaId", checkJwt, itemController.create.bind(itemController));
itemRouter.delete("/:cartId/:itemId", checkJwt, itemController.remove.bind(itemController));
itemRouter.put("/:cartId/:itemId", checkJwt, itemController.edit.bind(itemController));

export default itemRouter;