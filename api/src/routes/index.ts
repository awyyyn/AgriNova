import express from "express";
import AuthRoutes from "./auth.routes.js";

const Router: express.Router = express.Router();

Router.use("/auth", AuthRoutes);

export default Router;
