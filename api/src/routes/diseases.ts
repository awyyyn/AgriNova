import express from "express";
import multer from "multer";
import { identifyDiseaseController } from "../controllers";

const Router: express.Router = express.Router();

Router.post("/identify", multer().single("img"), identifyDiseaseController);

export default Router;
