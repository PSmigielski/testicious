import express from "express";
import ItemController from "../controllers/CartItemController";
import checkJwt from "../middleware/checkJwt";
import checkUuid from "../middleware/checkUuid";

const cartItemController = new ItemController();
const cartItemRouter = express.Router();

cartItemRouter.post("/:cartId/:productId", checkJwt, checkUuid(["cartId", "productId"]), cartItemController.create.bind(cartItemController));
cartItemRouter.delete("/:cartId/:itemId", checkJwt, checkUuid(["cartId", "itemId"]), cartItemController.remove.bind(cartItemController));
cartItemRouter.put("/:cartId/:itemId", checkJwt, checkUuid(["cartId", "itemId"]), cartItemController.edit.bind(cartItemController));

export default cartItemRouter;