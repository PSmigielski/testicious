import express from "express";
import CartController from "../controllers/CartController";
import checkJwt from "../middleware/checkJwt";
const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.post("", checkJwt, cartController.create.bind(cartController));


export default cartRouter;