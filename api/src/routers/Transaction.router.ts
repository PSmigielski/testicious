import { Router } from "express";
import TransactionController from "../controllers/TransactionController";
import checkJwt from "../middleware/checkJwt";
import checkUuid from "../middleware/checkUuid";

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.post("/:cartId", checkJwt, checkUuid("cartId"), transactionController.create.bind(transactionController));
transactionRouter.post("", transactionController.createWithoutUser.bind(transactionController));
transactionRouter.get("/:transactionId", checkJwt, checkUuid("transactionId"), transactionController.show.bind(transactionController));
transactionRouter.get("", checkJwt, transactionController.fetchAll.bind(transactionController));
export default transactionRouter