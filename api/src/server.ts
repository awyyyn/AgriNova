import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Router from "./routes";
import * as tf from "@tensorflow/tfjs-node";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { initModel } from "./utils/tfjs";

const app = express();

initModel();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.get("/health-check", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", Router);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
