import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routers/Auth.router";
import prismaErrorHandler from "./middleware/prismaErrorHandler";
import productRouter from "./routers/Product.router";
import cartRouter from "./routers/Cart.router";
import cartItemRouter from "./routers/CartItem.router";
import toppingRouter from "./routers/Topping.router";
import categoryRouter from "./routers/Category.router";


dotenv.config();
const app: Express = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/v1/api/auth", authRouter);
app.use("/v1/api/products", productRouter);
app.use("/v1/api/carts", cartRouter);
app.use("/v1/api/cartItems", cartItemRouter);
app.use("/v1/api/toppings", toppingRouter);
app.use("/v1/api/categories", categoryRouter);
app.use(prismaErrorHandler);
app.use(errorHandler);
app.listen(process.env.PORT, () => console.log(`api is running at ${process.env.HOSTNAME}:${process.env.PORT}`));