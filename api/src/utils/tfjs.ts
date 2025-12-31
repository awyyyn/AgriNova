import * as tf from "@tensorflow/tfjs-node";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// let model: mobilenet.Se;

let model: tf.LayersModel;

export async function initModel() {
  const modelPath = `file://${path.resolve(__dirname, "../models/model.json")}`;
  model = await tf.loadLayersModel(modelPath);
  if (!model) {
    throw new Error("❌ Model not initialized. Call initModel() first.");
  }
  console.log("MobileNet model loaded successfully");
  return model;
}

export async function preprocessImage(imagePath: string) {
  const buffer = await sharp(imagePath)
    .resize(224, 224)
    .removeAlpha()
    .raw()
    .toBuffer();

  return tf.tensor3d(buffer, [224, 224, 3]).expandDims(0).toFloat().div(255.0);
}

export async function predict(file: string): Promise<{
  index: number;
  confidence: number;
}> {
  const input = await preprocessImage(file);
  const output = model.predict(input) as tf.Tensor;

  const predictions = await output.data();

  input.dispose();
  output.dispose();

  const confidence = Math.max(...predictions);
  const index = predictions.indexOf(confidence);

  return { index, confidence };
}

export function loadImage(path: string) {
  const buffer = fs.readFileSync(path);
  const tfImage = tf.node
    .decodeImage(buffer, 3)
    .resizeNearestNeighbor([244, 244])
    .toFloat()
    .div(tf.scalar(255.0))
    .expandDims(0) as tf.Tensor4D;
  // .expandDims();
  return tfImage;
}

export { model };
