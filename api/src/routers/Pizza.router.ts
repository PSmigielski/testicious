import express from "express";
import PizzaController from "../controllers/PizzaController";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import schemaValidator from "../middleware/schemaValidator";
import Roles from "../types/Roles";

const pizzaRouter = express.Router();

const pizzaController = new PizzaController();

pizzaRouter.post("", checkJwt, checkRole(Roles.ADMIN),schemaValidator("/../../schemas/pizza.schema.json"), pizzaController.create.bind(pizzaController));
pizzaRouter.put("/:id", checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/pizzaUpdate.schema.json"), pizzaController.update.bind(pizzaController));
pizzaRouter.get("", checkJwt, pizzaController.fetch.bind(pizzaController));
pizzaRouter.delete("/:id", checkJwt, checkRole(Roles.ADMIN), pizzaController.remove.bind(pizzaController));

export default pizzaRouter;