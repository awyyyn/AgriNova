import axios from "axios";
import type { Request, Response } from "express";
import * as tf from "@tensorflow/tfjs-node";
import { loadImage, model, predict, preprocessImage } from "../utils/tfjs";
import { CLASS_LABELS } from "../constants";

export const identifyDiseaseController = async (
  req: Request,
  res: Response,
) => {
  if (!req.file) {
    console.log("No file uploaded");
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const form = new FormData();

  // ✅ Attach the actual file
  form.append("similar_images", "true");
  form.append("images", req.file.path);
  form.append("similar_images", "true");
  form.append("details", "severity,treatment");
  form.append("similar_images", "true");

  await axios
    .post(
      `https://my-api.plantnet.org/v2/diseases/identify?include-related-images=true&api-key=${process.env.PLANTNET_API_KEY}`,
      form,
      {
        headers: {
          "Api-Key": process.env.PLANTNET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        maxBodyLength: Infinity,
      },
    )
    .then((response) => {
      console.log("============ RESPONSE ============");
      console.log(JSON.stringify(response.data));
      res.status(200).json({ data: response.data });
    })
    .catch((error) => {
      console.log("============ ERROR ============");
      console.log(error);
      res.json(error);
    });
};

export const predictDiseaseController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const { confidence, index } = await predict(req.file.path);

    res.json({
      confidence,
      label: CLASS_LABELS[index],
      index: index,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
};
