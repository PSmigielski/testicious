import Server from "./config/Server";
import AuthController from "./controllers/AuthController";
import cookieParser from "cookie-parser";
import { json } from "express";
import cors from "cors";
import prismaErrorHandler from "./middleware/prismaErrorHandler";
import errorHandler from "./middleware/errorHandler";
import CartController from "./controllers/CartController";

const controllers = [new AuthController(), new CartController()];
const globalMiddleware = [cookieParser(), json(), cors({ credentials: true, origin: process.env.FRONTEND_URL })];
const errorHandlers = [prismaErrorHandler, errorHandler];
new Server(controllers, globalMiddleware, errorHandlers).startServer();

// app.use("/v1/api/products", productRouter);
// app.use("/v1/api/carts", cartRouter);
// app.use("/v1/api/cartItems", cartItemRouter);
// app.use("/v1/api/toppings", toppingRouter);
// app.use("/v1/api/categories", categoryRouter);
// app.use("/v1/api/upload", uploadRouter);
// app.use("/v1/api/discounts", discountRouter);
// app.use("/v1/api/transactions", transactionRouter);
