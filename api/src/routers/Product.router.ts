import express from "express";
import ProductController from "../controllers/ProductController";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import schemaValidator from "../middleware/schemaValidator";
import Roles from "../types/Roles";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("/:categoryId", checkJwt, checkRole(Roles.ADMIN),schemaValidator("/../../schemas/product.schema.json"), productController.create.bind(productController));
productRouter.put("/:categoryId/:id", checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/productUpdate.schema.json"), productController.update.bind(productController));
productRouter.get("/:categoryId", productController.fetch.bind(productController));
productRouter.delete("/:id", checkJwt, checkRole(Roles.ADMIN), productController.remove.bind(productController));

export default productRouter;