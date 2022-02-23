import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routers/Auth.router";
import prismaErrorHandler from "./middleware/prismaErrorHandler";
import pizzaRouter from "./routers/Pizza.router";
import cartRouter from "./routers/Cart.router";
import itemRouter from "./routers/Item.router";


dotenv.config();
const app: Express = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/v1/api/auth", authRouter);
app.use("/v1/api/pizzas", pizzaRouter);
app.use("/v1/api/carts", cartRouter);
app.use("/v1/api/items", itemRouter);
app.use(prismaErrorHandler);
app.use(errorHandler);
app.listen(process.env.PORT, () => console.log(`api is running at ${process.env.HOSTNAME}:${process.env.PORT}`));