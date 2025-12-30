import express from "express";
import multer from "multer";
import { identifyDiseaseController } from "../controllers";
import { upload } from "../utils/multer";

const Router: express.Router = express.Router();

Router.post("/identify", upload.single("img"), identifyDiseaseController);

export default Router;
