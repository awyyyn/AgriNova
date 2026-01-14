import express from "express";
import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";

const Router: express.Router = express.Router();

Router.use("/auth", AuthRoutes);
Router.use("/user", UserRoutes);

export default Router;
