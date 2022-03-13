import express from "express";
import ItemController from "../controllers/CartItemController";
import checkJwt from "../middleware/checkJwt";

const cartItemController = new ItemController();
const cartItemRouter = express.Router();

cartItemRouter.post("/:cartId/:pizzaId", checkJwt, cartItemController.create.bind(cartItemController));
cartItemRouter.delete("/:cartId/:itemId", checkJwt, cartItemController.remove.bind(cartItemController));
cartItemRouter.put("/:cartId/:itemId", checkJwt, cartItemController.edit.bind(cartItemController));

export default cartItemRouter;