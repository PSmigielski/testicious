import Server from "./config/Server";
import AuthController from "./controllers/AuthController";
import cookieParser from "cookie-parser";
import { json } from "express";
import cors from "cors";
import prismaErrorHandler from "./middleware/prismaErrorHandler";
import errorHandler from "./middleware/errorHandler";
import CartController from "./controllers/CartController";
import CartItemController from "./controllers/CartItemController";
import CategoryController from "./controllers/CategoryController";
import DiscountController from "./controllers/DiscountController";
import ProductController from "./controllers/ProductController";
import ToppingController from "./controllers/ToppingController";
import TransactionController from "./controllers/TransactionController";

const controllers = [
    new AuthController(),
    new CartController(),
    new CartItemController(),
    new CategoryController(),
    new DiscountController(),
    new ProductController(),
    new ToppingController(),
    new TransactionController(),
];
const globalMiddleware = [cookieParser(), json(), cors({ credentials: true, origin: process.env.FRONTEND_URL })];
const errorHandlers = [prismaErrorHandler, errorHandler];
new Server(controllers, globalMiddleware, errorHandlers).startServer();

// app.use("/v1/api/toppings", toppingRouter);
// app.use("/v1/api/upload", uploadRouter);
// app.use("/v1/api/transactions", transactionRouter);
