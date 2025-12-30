import * as tf from "@tensorflow/tfjs-node";
import * as mobilenet from "@tensorflow-models/mobilenet";
import fs from "node:fs";

let model: mobilenet.MobileNet;

export async function initModel() {
  tf.getBackend();
  model = await mobilenet.load({ version: 2, alpha: 1.0 });

  console.log("MobileNet model loaded successfully");
}

export function loadImage(path: string) {
  const buffer = fs.readFileSync(path);
  const tfImage = tf.node
    .decodeImage(buffer, 3)
    .resizeNearestNeighbor([244, 244])
    .toFloat()
    .div(tf.scalar(255.0));
  // .expandDims();
  return tfImage;
}

export { model };
