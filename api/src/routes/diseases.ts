import express from "express";
import {
  identifyDiseaseController,
  predictDiseaseController,
} from "../controllers";
import { upload } from "../utils/multer";
import multer from "multer";

const Router: express.Router = express.Router();

Router.post("/identify", upload.single("image"), identifyDiseaseController);
Router.post("/identifyv2", upload.single("image"), predictDiseaseController);

Router.post("/identify-debug", multer().any(), (req, res) => {
  console.log("Files:", req.files);
  console.log("Body:", JSON.stringify(req.body, null, 2));
  res.send("Check console for field names");
});

export default Router;
