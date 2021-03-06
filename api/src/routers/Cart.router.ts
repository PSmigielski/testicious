import express from "express";
import CartController from "../controllers/CartController";
import checkJwt from "../middleware/checkJwt";
import checkUuid from "../middleware/checkUuid";
const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.post("", checkJwt, cartController.create.bind(cartController));
cartRouter.get("/:cartId", checkJwt, checkUuid("cartId"),cartController.getItems.bind(cartController));

export default cartRouter;