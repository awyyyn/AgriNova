import axios from "axios";
import type { Request, Response } from "express";
import FormData from "form-data";
import fs from "node:fs";

export const identifyDiseaseController = async (
  req: Request,
  res: Response,
) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded." });

  const form = new FormData();

  // ✅ Attach the actual file
  form.append("images", req.body.img);

  // ✅ Other fields
  form.append("similar_images", "true");

  await axios
    .post(
      `https://my-api.plantnet.org/v2/diseases/identify?api-key=${process.env.PLANTNET_API_KEY}`,
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
      console.log(JSON.stringify(response.data.data));
      res.status(200).json({ data: response.data });
    })
    .catch((error) => {
      console.log("=========== ERROR: ===========");
      console.error(error);
      res.json(error);
    });
};
