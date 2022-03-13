import express from "express";
import CategoryController from "../controllers/CategoryController";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import schemaValidator from "../middleware/schemaValidator";
import Roles from "../types/Roles";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.get("", checkJwt, checkRole(Roles.ADMIN), categoryController.showAll.bind(categoryController));
categoryRouter.post("", checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/category.schema.json"), categoryController.create.bind(categoryController));
categoryRouter.put("/:id", checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/editCategory.schema.json"), categoryController.update.bind(categoryController));
categoryRouter.delete("/:id", checkJwt, checkRole(Roles.ADMIN), categoryController.remove.bind(categoryController));

export default categoryRouter;