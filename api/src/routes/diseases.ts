import express from "express";
import { identifyDiseaseController } from "../controllers";
import { upload } from "../utils/multer";
import multer from "multer";

const Router: express.Router = express.Router();

Router.post("/identify", identifyDiseaseController);

Router.post("/identify-debug", multer().any(), (req, res) => {
  console.log("Files:", req.files);
  console.log("Body:", JSON.stringify(req.body, null, 2));
  res.send("Check console for field names");
});

export default Router;
