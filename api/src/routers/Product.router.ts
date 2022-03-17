import express from "express";
import ProductController from "../controllers/ProductController";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import schemaValidator from "../middleware/schemaValidator";
import Roles from "../types/Roles";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("/:categoryId", checkJwt, checkRole(Roles.ADMIN), checkUuid("categoryId"),schemaValidator("/../../schemas/product.schema.json"), productController.create.bind(productController));
productRouter.put("/:categoryId/:id", checkJwt, checkRole(Roles.ADMIN), checkUuid(["categoryId", "id"]), schemaValidator("/../../schemas/productUpdate.schema.json"), productController.update.bind(productController));
productRouter.get("", productController.fetch.bind(productController));
productRouter.delete("/:id", checkJwt, checkRole(Roles.ADMIN), checkUuid("id"),productController.remove.bind(productController));

export default productRouter;