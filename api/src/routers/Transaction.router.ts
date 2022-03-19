import { Router } from "express";
import TransactionConroller from "../controllers/TransactionController";
import checkJwt from "../middleware/checkJwt";

const transactionRouter = Router();
const transactionConroller = new TransactionConroller();

transactionRouter.post("/:cartId", checkJwt, transactionConroller.create.bind(transactionConroller))

export default transactionRouter