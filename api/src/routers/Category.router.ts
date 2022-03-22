import express from "express";
import CategoryController from "../controllers/CategoryController";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import checkUuid from "../middleware/checkUuid";
import schemaValidator from "../middleware/schemaValidator";
import Roles from "../types/Roles";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.get("", categoryController.showAll.bind(categoryController));
categoryRouter.post("", checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/category.schema.json"), categoryController.create.bind(categoryController));
categoryRouter.put("/:id", checkJwt, checkRole(Roles.ADMIN), checkUuid("id"),schemaValidator("/../../schemas/editCategory.schema.json"), categoryController.update.bind(categoryController));
categoryRouter.delete("/:id", checkJwt, checkRole(Roles.ADMIN), checkUuid("id"),categoryController.remove.bind(categoryController));

export default categoryRouter;