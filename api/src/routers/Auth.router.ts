import express from "express";
import AuthController from "../controllers/AuthController";
import checkJwt from "../middleware/checkJwt";
import checkRole from "../middleware/checkRole";
import errorHandler from "../middleware/errorHandler";
import schemaValidator from "../middleware/schemaValidator";
import Roles from "../types/Roles";

const authRouter = express.Router();

const authController = new AuthController();
authRouter.post("/register", schemaValidator("/../../schemas/register.schema.json"), authController.register.bind(authController));
authRouter.post("/login", schemaValidator("/../../schemas/login.schema.json"), authController.login.bind(authController));
authRouter.post("/logout", checkJwt, authController.logout.bind(authController));
authRouter.get("/verify/:requestId", authController.verify.bind(authController));
authRouter.post("/refresh", authController.refreshBearerToken.bind(authController));
authRouter.post("/forget", schemaValidator("/../../schemas/forget.schema.json"), authController.sendResetRequest.bind(authController));
authRouter.put("/reset/:requestId", schemaValidator("/../../schemas/reset.schema.json"), authController.reset.bind(authController));
authRouter.put("/edit", checkJwt, schemaValidator("/../../schemas/editAccount.schema.json"),authController.editAccountData.bind(authController));
authRouter.put("/edit/password", checkJwt, schemaValidator("/../../schemas/editPassword.schema.json"),authController.editPassword.bind(authController));
authRouter.put("/edit/role/:id", checkJwt, checkRole(Roles.ADMIN), schemaValidator("/../../schemas/changeRole.schema.json"), authController.changeRole.bind(authController));

export default authRouter;