import express from "express";
import DiseasesRouter from "./diseases";

const Router: express.Router = express.Router();

Router.use("/diseases", DiseasesRouter);

export default Router;
