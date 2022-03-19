import { Router } from "express";
import TransactionConroller from "../controllers/TransactionController";
import checkJwt from "../middleware/checkJwt";
import checkUuid from "../middleware/checkUuid";

const transactionRouter = Router();
const transactionConroller = new TransactionConroller();

transactionRouter.post("/:cartId", checkJwt, checkUuid("cartId"), transactionConroller.create.bind(transactionConroller));
transactionRouter.get("/:transactionId", checkJwt, checkUuid("transactionId"), transactionConroller.show.bind(transactionConroller));
transactionRouter.get("", checkJwt, transactionConroller.fetchAll.bind(transactionConroller));
export default transactionRouter