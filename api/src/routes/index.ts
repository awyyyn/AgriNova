import express from "express";
import AuthRoutes from "./auth.routes.js";
import PasswordRoutes from "./password.routes.js";

const Router: express.Router = express.Router();

Router.use("/auth", AuthRoutes);

Router.use("/password", PasswordRoutes);

export default Router;
