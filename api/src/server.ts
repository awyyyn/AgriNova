import express from "express";
import cors from "cors";
import axios from "axios";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health-check", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
